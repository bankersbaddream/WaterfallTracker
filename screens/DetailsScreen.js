import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, MapView } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import waterfalls from '../assets/waterfalls.json';

const DetailsScreen = () => {
  const [visitDate, setVisitDate] = useState('');
  const [journalNotes, setJournalNotes] = useState('');
  const [visitedWaterfalls, setVisitedWaterfalls] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { waterfall } = route.params;

  useEffect(() => {
    const loadVisitedWaterfalls = async () => {
      try {
        const storedVisitedWaterfalls = await useAsyncStorage.getItem('@visitedWaterfalls');
        if (storedVisitedWaterfalls) {
          setVisitedWaterfalls(JSON.parse(storedVisitedWaterfalls));
        }
      } catch (error) {
        console.error('Error loading visited waterfalls:', error);
      }
    };

    loadVisitedWaterfalls();
  }, []);

  const handleCheckIn = async () => {
    const newVisitedWaterfall = {
      ...waterfall,
      VisitDate: visitDate,
      JournalNotes: journalNotes,
    };

    const updatedVisitedWaterfalls = [...visitedWaterfalls, newVisitedWaterfall];
    setVisitedWaterfalls(updatedVisitedWaterfalls);

    try {
      await useAsyncStorage.setItem('@visitedWaterfalls', JSON.stringify(updatedVisitedWaterfalls));
    } catch (error) {
      console.error('Error saving visited waterfall:', error);
    }

    navigation.goBack();
  };

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (waterfall.Coordinates) {
      const [lat, lng] = waterfall.Coordinates.split('; ').map(coord => parseFloat(coord.replace(/°|′|″|N|W/g, '')));
      setRegion({
        latitude: lat,
        longitude: -lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [waterfall]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{waterfall.Name}</Text>
      <MapView
        style={styles.map}
        region={region}
      />
      <Text style={styles.label}>Visit Date:</Text>
      <TextInput
        style={styles.input}
        value={visitDate}
        onChangeText={setVisitDate}
      />
      <Text style={styles.label}>Journal Notes:</Text>
      <TextInput
        style={styles.input}
        value={journalNotes}
        onChangeText={setJournalNotes}
        multiline
        numberOfLines={4}
      />
      <Button title="Check In" onPress={handleCheckIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    height: 300,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default DetailsScreen;

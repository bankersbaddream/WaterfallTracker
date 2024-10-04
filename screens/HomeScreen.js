import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import waterfalls from '../assets/waterfalls.json';

const HomeScreen = ({ navigation }) => {
  const [visitedWaterfalls, setVisitedWaterfalls] = useState([]);

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

  const handlePress = (waterfall) => {
    navigation.navigate('Details', { waterfall });
  };

  const isVisited = (waterfall) => {
    return visitedWaterfalls.some((visited) => visited.Name === waterfall.Name);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={waterfalls}
        keyExtractor={(item) => item.Name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
            <Text style={styles.name}>{item.Name}</Text>
            <Text style={styles.visited}>{isVisited(item) ? 'Visited' : 'Not Visited'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  visited: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;

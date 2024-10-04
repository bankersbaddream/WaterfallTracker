import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Waterfall Tracker' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Waterfall Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

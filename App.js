import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { asdkfljlsdf } from '@expo/vector-icons'
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
const MainStack = createStackNavigator();

const MyTheme = {
  dark: false,
  fontSize: 34,
  colors: {
    primary: 'rgba(21, 39, 65, 0.8)',
    background: 'rgb(178, 212, 238)',
    card:'#829AAD',
    text: '#BBDEFA',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    'Permanent-Marker': require('./assets/fonts/MarkerFelt.ttf'),
  })
  //if no db table favorites set up db with favorites table with uri column
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <NavigationContainer theme={MyTheme}>
      <MainStack.Navigator initialRouteName="All Dogs" style={styles.nav}>
        <MainStack.Screen name="All Dogs" component={HomeScreen} />
        <MainStack.Screen name="My Favorites" component={FavoritesScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

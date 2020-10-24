import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dogUri, setDogUri] = useState('https://placedog.net/300/500/s')

  const handlePress = async()=> {
    let dogImage = await fetch('https://dog.ceo/api/breeds/image/random')
    /*
    const randomNum = Math.floor(Math.random() *4)
    const arrayOfUris = ['https://placedog.net/300/500?random/s', 'https://placedog.net/300/300?random/s', 'https://placedog.net/320/500?random/s', 'https://placedog.net/310/525/s']
    console.log(arrayOfUris)
    console.log(randomNum)
    console.log(arrayOfUris[randomNum])
    setDogUri(arrayOfUris[randomNum])
    */
    dogImage = await dogImage.json()
    await console.log(dogImage)
    await setDogUri(dogImage.message)
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Man's best Friend</Text>
      <Image
        source={{
          width: '100%',
          height: 500,
          uri: `${dogUri}`
        }}
      />
      <TouchableOpacity onPress={handlePress} >
        <Text>View another pooch</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
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

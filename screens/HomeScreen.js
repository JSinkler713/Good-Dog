import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Button, TouchableOpacity, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSpring } from 'react-spring';

import { Ionicons } from '@expo/vector-icons'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.gooddog');


export default function Home({navigation, route}) {
  //if no db table favorites set up db with favorites table with uri column
  useEffect(()=> {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists favorites (id integer primary key not null,  uri text);"
      );
    });
  }, [])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dogUri, setDogUri] = useState('https://placedog.net/300/500/s')

  const handlePress = async()=> {
    let dogImage = await fetch('https://dog.ceo/api/breeds/image/random')
    dogImage = await dogImage.json()
    await console.log(dogImage)
    await setDogUri(dogImage.message)
  }
  const handleFavorite = ()=> {
    console.log('setting this dog url into favorites')
    console.log(dogUri)
    // set into dogImageFavorites table
    console.log('Inserting into sql database')
    console.log('This is all my favorites so far')
    // fetch all dogImageFavorites and console.log
    db.transaction(
      tx => {
        //sets the done value to 0, and the value value to text
        tx.executeSql("insert into favorites (uri) values (?)", [dogUri]);
        //then executes a select *
        //the [] is beacuse no ?'s(params), and thenext part is the success callback
        tx.executeSql("select * from favorites", [], (_, { rows }) => {
          console.log('heyoo', JSON.stringify(rows))
          console.log('-------------------')
        });
      },
      //the null is the error
      null,
      //the forceUpdate is the success
      //forceUpdate
    );
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Man's best Friend</Text>
      <Button style={{fontSize: 24}} onPress={()=> navigation.navigate('FavoritesScreen')} title={'Favs ♥️'}></Button>
      <TouchableOpacity onPress={handlePress} >
        <View style={styles.imageStyle}>
          <Image
            source={{
              width: '100%',
              height: 400,
              uri: `${dogUri}`
            }}
            style={styles.image}
            fadeDuration={1500}
          />
          <Text>View another pooch</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.markAsFav}>
          <Ionicons name="ios-paw" size={32} color="green" />
          <Text onPress={handleFavorite}>Keep as Favorite</Text>
          <Ionicons name="ios-paw" size={32} color="green" />
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    maxHeight: 450,
    borderRadius: 3,
    backgroundColor: '#f7f5f3',
  },
  image: {


  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  markAsFav: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.gooddog');

export default function Favorites() {
  //if no db table favorites set up db with favorites table with uri column
  const [favorites, setFavorites] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(()=> {
    fetchFavorites()
  }, [])

  const fetchFavorites = ()=> {
    db.transaction(tx => {
      tx.executeSql("select * from favorites", [], (_, { rows: { _array} }) => {
        console.log('line 20')
        console.log(_array)
        if (_array.length > 0){
          console.log('more than 0 favs')
          setFavorites(_array)
        }

      });
    });
  }
    

  console.log('favorites', typeof favorites)

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Fav's</Text>
      {/* favorites && favorites.length > 0 ?<Text>{favorites[0].uri}</Text>: <Text>nothing here</Text>
      */}
        <FlatList
          vertical={true}
          style={[{backgroundColor: '#52616E', flex: 1, flexDirection: 'column'}, styles.colorPreview]}
          data={favorites}
          keyExtractor={item => item.uri}
          renderItem={({ item }) => (
            <Image 
              style={styles.favImage}
              source={{
                width: 300,
                height: 350,
                uri: `${item.uri}`
              }}
            />
          )}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(178, 212, 238)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favImage: {
    margin: 5,
    borderWidth: 2,
    borderColor: '#f0f3f3',
    padding: 2,
    borderRadius: 5,
  },
});

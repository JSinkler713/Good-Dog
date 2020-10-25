import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.gooddog');

export default function Favorites() {
  //if no db table favorites set up db with favorites table with uri column
  let [favorites, setFavorites] = useState([])
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
          (_array).forEach(object => console.log(object.uri))
        }

      });
    });
  }
    

  console.log('favorites', typeof favorites)

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Man's best Friend</Text>
      {/* favorites && favorites.length > 0 ?<Text>{favorites[0].uri}</Text>: <Text>nothing here</Text>
      */}
        <FlatList
          horizontal={true}
          style={[{flex: 1, flexDirection: 'row'}, styles.colorPreview]}
          data={favorites}
          keyExtractor={item => item.uri}
          renderItem={({ item }) => (
            <Image 
              style={styles.favImage}
              source={{
                width: 100,
                height: 150,
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
    shadowColor: "#000",
    shadowOffset: {
            width: 9,
            height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

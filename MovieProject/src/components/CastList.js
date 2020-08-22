import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';



const CastList = ({results}) => {

  return (
    <View style={styles.container}>
      
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={results}
        renderItem={({item}) => {
          return (    
              <HMovieItem item={item} />
          );
        }}
      />
    </View>
  );
};

const HMovieItem = ({item}) => {

  const movieImage = () => {
    if (item.profile_path) {
      return `https://image.tmdb.org/t/p/original/${item.profile_path}`
    }
    return 'https://i.stack.imgur.com/l60Hf.png'
  }

  return (
    <>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: movieImage()}}/>
        <Text style={styles.castNameItem}>{item.name}</Text>
        <Text style={styles.charNameItem}>{item.character}</Text>
      </View>
    </>
  );
};

export default CastList;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 20
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  itemContainer: {
    flex: 1,
    width: 130,
  },
  
  castNameItem: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },

  charNameItem: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
  },

  image: {
    height: 150,
    resizeMode: 'cover',
    marginHorizontal: 5,
    borderRadius: 15,
  },
});

import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const HMovieList = ({title, results}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.titleStyle}>
        {title}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={results}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', {id: item.id})}>
              <HMovieItem item={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const HMovieItem = ({item}) => {
  return (
    <>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: item.image_url}} />
        <Text style={styles.titleItem}>{item.title}</Text>
      </View>
    </>
  );
};

export default HMovieList;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  itemContainer: {
    flex: 1,
    width: 150,
  },
  titleItem: {
    textAlign: 'center',
    marginTop: 5,
  },

  image: {
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
});

import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const HMovieList = ({title, results, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={results}
        renderItem={({item}) => <HMovieItem item={item} />}
        keyExtractor={item => item.id}
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

  itemContainer: {},
  titleItem: {
    textAlign: 'center',
    marginTop: 5,
  },

  image: {
    width: Dimensions.get('screen').width / 3,
    height: ((Dimensions.get('screen').width / 3) * 4) / 3,
    resizeMode: 'contain',
  },
});

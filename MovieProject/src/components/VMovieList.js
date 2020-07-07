import React, {memo} from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const VMovieList = ({results}) => {
  console.log('V Movie List');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', {id: item.id})}>
              <MovieItem item={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default memo(VMovieList);

const MovieItem = props => {
  return (
    <>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: props.item.image_url}} />
        <View style={styles.descriptionStyle}>
          <Text style={styles.titleItem} numberOfLines={1} ellipsizeMode="tail">
            {props.item.title}
          </Text>
          <Text
            style={styles.overviewItem}
            numberOfLines={2}
            ellipsizeMode="tail">
            {props.item.overview}
          </Text>
        </View>
      </View>
      <View style={styles.seperator} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  seperator: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
  },

  image: {
    flex: 1,
    height: (((Dimensions.get('window').width - 20) / 3) * 4) / 3,
    resizeMode: 'contain',
    borderRadius: 10,
  },

  descriptionStyle: {
    flex: 2,
    marginLeft: 15,
  },

  titleItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  overviewItem: {
    marginTop: 10,
  },
});

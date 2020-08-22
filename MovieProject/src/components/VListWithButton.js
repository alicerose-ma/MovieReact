import React, { memo } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const VMovieList = ({ results }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', { id: item.id })}>
              <MovieItem item={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default memo(VMovieList);

const MovieItem = ({ item }) => {
  const movieImage = () => {
    if (item.poster_path) {
      return `https://image.tmdb.org/t/p/original/${item.poster_path}`
    }
    return 'https://www.windhorsepublications.com/wp-content/uploads/2019/11/image-coming-soon-placeholder2.png'
  }
  return (
    <>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: movieImage() }} />
        <View style={styles.descriptionStyle}>
          <Text style={styles.titleItem}>
            {item.title}
          </Text>
          <Text
            style={styles.overviewItem}
            numberOfLines={3}
            ellipsizeMode="tail">
            {item.overview}
          </Text>
          <Button style={{ borderColor: "#FF8784", borderWidth: 2, width: 150, height: 45, marginTop: 15}} color="red"
            onPress={() => console.log("click remove all")
            }>Remove</Button>
        </View>
      </View>
      <View style={styles.seperator} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: (((Dimensions.get('window').width - 20) / 3) * 5) / 4,
    resizeMode: 'stretch',
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

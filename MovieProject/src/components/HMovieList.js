import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';



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
        keyExtractor={item => item.id.toString()}
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
  const movieImage = () => {
    if (item.poster_path) {
      return `https://image.tmdb.org/t/p/original/${item.poster_path}`
    }
    return 'https://www.windhorsepublications.com/wp-content/uploads/2019/11/image-coming-soon-placeholder2.png'
  }

  return (
    <>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: movieImage()}}/>
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center' , marginTop: 5, }}>
          <FontAwesome5Icon name="star" solid color='#e5c100' style={{borderColor: 'black', fontSize: 14 }}/>
          <Text style={{ marginLeft: 5, fontSize: 15}}>{item.vote_average}</Text>
        </View>
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
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  itemContainer: {
    flex: 1,
    width: (Dimensions.get('window').width -100) /2,
  },
  
  titleItem: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },

  image: {
    height: (((Dimensions.get('window').width -100) /2) * 6)/5,
    resizeMode: 'stretch',
    marginHorizontal: 5,
    borderRadius: 15
  },
});

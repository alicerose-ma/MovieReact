import React, { memo } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Platform, TouchableHighlight } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

const VMovieList = ({ results, button, action }) => {

  return (
    <View style={styles.container}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return <MovieItem item={item} button={button} action={action}/>
        }}
      />
    </View>
  )
};

export default memo(VMovieList);

const MovieItem = ({ item, action, button }) => {
  const navigation = useNavigation();
  const movieImage = () => {
    if (item.poster_path) {
      return `https://image.tmdb.org/t/p/original/${item.poster_path}`
    }
    return 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg'
  }
  return (
    <>
      <View style={styles.itemContainer}>
        <View style={{flex: 3}}>
        <TouchableOpacity
              onPress={() => navigation.push('MovieDetail', { id: item.id })}>
        <Image style={styles.image} source={{ uri: movieImage() }} />
        </TouchableOpacity>
        </View>
 
        <View style={{flex: 5}} >
        <TouchableOpacity
              onPress={() => navigation.push('MovieDetail', { id: item.id })}>
            <Text style={styles.titleItem}>
            {item.title}
            </Text>
            <Text
              style={styles.overviewItem}
              numberOfLines={4}
              ellipsizeMode="tail">
              {item.overview}
            </Text>
            </TouchableOpacity>
          
      
            <View style={{ marginVertical: 5, width: '50%'}}>
              {button ?
                <TouchableOpacity
                  onPress={() => action(item.id)}>
                    {/* <Text style={{borderColor: "#FF8784", borderWidth: 2, borderRadius: 5, textAlign: 'center', color: 'red', fontSize: 15, padding: 5, fontWeight:'600'}}>REMOVE</Text> */}
                  <Button style={{
                    borderColor: "#FF8784", borderWidth: 2,
                  }} color="red">Remove</Button>
                </TouchableOpacity>
                : null
              }
            </View>
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
    flex: 1,
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
    marginRight: 15
  },

  descriptionStyle: {
    flex: 2,
    marginLeft: 15,
    justifyContent: 'center',
  },

  titleItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  overviewItem: {
    marginTop: 5,
  },

  rowFront: {
    borderBottomWidth: 1,
    borderBottomColor: '#90CAF9',
    paddingVertical: 7,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'white',
  },

  totalList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },

  listStyle: {
    fontSize: 18,
    fontWeight: '700',
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },

  deleteStyle: {
    color: 'white',
    fontWeight: 'bold'
  }
});

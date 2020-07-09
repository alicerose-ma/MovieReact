import React, {memo, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusBar from '../../components/CustomStatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import HMovieList from '../../components/HMovieList';
import MovieContext from '../../context/MovieContext';

const DATA1 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item FirstItem ALice OK ',
    image_url:
      'https://cdn.onebauer.media/one/empire-images/features/59e8d795405a5c6805947751/44%20Fear%20and%20Loathing%20in%20Las%20Vegas.jpg?quality=50&width=1000&ratio=1-1&resizeStyle=aspectfit&format=jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQl18fcJa9z_X9Tk72IvCBBSSWk6TPG98YYPw&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-24343fhf',
    title: 'Third and Half Item',
    image_url:
      'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/star-is-born-web.jpg',
  },
];

const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Four Item',
    image_url:
      'https://cdn.onebauer.media/one/empire-images/features/59e8d795405a5c6805947751/44%20Fear%20and%20Loathing%20in%20Las%20Vegas.jpg?quality=50&width=1000&ratio=1-1&resizeStyle=aspectfit&format=jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Five Item',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Six Item',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQl18fcJa9z_X9Tk72IvCBBSSWk6TPG98YYPw&usqp=CAU',
  },
  {
    id: '58694a0f-3da1-471f-bd96-24343fhf',
    title: 'Seven Item',
    image_url:
      'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/star-is-born-web.jpg',
  },
];

const MovieScreen = () => {
  const movieList = useContext(MovieContext);

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader
        title="Movie"
        leftButtonName="bars"
        rightButtonName="search"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainThumbContainer}>
          <Text style={styles.mainMovieText}>New Movie</Text>
          <Image
            style={styles.mainThumb}
            source={{
              uri:
                'https://happyflower.vn/app/uploads/2019/11/Dau_SnowWhite_2.jpg',
            }}
          />
        </View>
        <HMovieList title="Now Playing" results={DATA1} />
        <HMovieList title="Upcoming" results={DATA2} />
      </ScrollView>
    </>
  );
};
export default memo(MovieScreen);

const styles = StyleSheet.create({
  mainThumbContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  mainThumb: {
    width: Dimensions.get('window').width / 2,
    height: ((Dimensions.get('window').width / 2) * 4) / 3,
    resizeMode: 'contain',
  },

  mainMovieText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});

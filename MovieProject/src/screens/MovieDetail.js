import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';
import MovieTextDetail from '../components/MovieTextDetail';

const MovieDetail = ({route}) => {
  const {id} = route.params;
  const [result, setResult] = useState({});
  const [numberLines, setNumberLines] = useState(3);
  const [viewOption, setViewOption] = useState('View More');

  const getMovie = id => {
    console.log('movie detail');
    console.log(id);
    setResult({
      id: '1',
      title:
        'Title Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      overview:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipssum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image_url:
        'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
      genres: 'Action',
      language: 'english',
      release_date: '2020-07-07',
      runtime: 94,
    });
  };

  useEffect(() => {
    getMovie(id);
  }, []);

  const clickView = () => {
    if (numberLines === 0) {
      setNumberLines(3);
      setViewOption('View More');
    } else {
      setNumberLines(0);
      setViewOption('View Less');
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader leftButtonName="arrow-left" />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: result.image_url}} />
        <View style={styles.titleAndOverview}>
          <Text style={styles.title}>{result.title}</Text>
          <Text numberOfLines={numberLines} style={styles.overview}>
            {result.overview}
          </Text>
          <TouchableOpacity onPress={clickView}>
            <Text style={styles.showViewMoreLess}>{viewOption}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailStyle}>
          <MovieTextDetail title="Runtime" value={result.runtime} />
          <MovieTextDetail title="Release Date" value={result.release_date} />
          <MovieTextDetail title="Genres" value={result.genres} />
          <MovieTextDetail title="Language" value={result.language} />
        </View>
      </ScrollView>
    </>
  );
};
export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8d8d8',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: 'black',
  },

  showViewMoreLess: {
    marginLeft: 15,
    color: 'blue',
    fontWeight: 'bold',
  },

  titleAndOverview: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 20,
  },

  detailStyle: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },

  overview: {
    marginTop: 10,
    marginHorizontal: 15,
  },

  image: {
    width: Dimensions.get('screen').width / 2,
    height: ((Dimensions.get('screen').width / 2) * 4) / 3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

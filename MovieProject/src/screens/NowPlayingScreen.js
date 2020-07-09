import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import VMovieList from '../components/VMovieList';

const MOVIE = [
  {
    id: '1',
    title:
      'Title Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    overview:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '2',
    title: 'Movie 2',
    overview: 'overview 2',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '3',
    title: 'Movie 2',
    overview: 'overview 2',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '4',
    title: 'Movie 2',
    overview: 'overview 2',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
  {
    id: '5',
    title: 'Movie 2',
    overview: 'overview 2',
    image_url:
      'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/4c177c2b7f7bb9a679f089bcb50f844e_3e89eb5d-ffbd-4033-a00f-e595a3ef2e2a_240x360_crop_center.progressive.jpg?v=1573587540',
  },
];

const NowPlayingScreen = () => {
  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader
        title="NowPlaying"
        leftButtonName="bars"
        rightButtonName="search"
      />
      <View style={styles.container}>
        <VMovieList results={MOVIE} />
      </View>
    </>
  );
};

export default NowPlayingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

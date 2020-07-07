import React, {useState} from 'react';
import {Text, View} from 'react-native';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = searchTerm => {
    console.log('call search');
    const MOVIE = [
      {
        id: '1',
        title: 'Title Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        overview: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
        overview: 'overview 3',
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

    setResults(MOVIE);
    // setErrorMessage('Got values');
  };

  return [searchApi, results, errorMessage];
};

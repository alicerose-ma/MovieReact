import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { useDispatch } from 'react-redux'

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = searchTerm => {
    console.log('call search');
    const dispatch = useDispatch()
    dispatch({type: MOVIE_TYPE.SEARCH, payload: {
      cb: (res) => {
        console.log("search result", res)
        // if (res.success) {
        //   setPlayingMovies(res.data.results)
        // }
        // setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
      }
    }})
    // console.log(results)
    // setResults(results);
  };

  return [searchApi, results, errorMessage];
};

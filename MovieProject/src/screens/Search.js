import React, {useState, memo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import SearchBar from '../components/SearchBar';
import VMovieList from '../components/VMovieList';
import useMovies from '../hooks/useMovies';
import CustomStatusBar from '../components/CustomStatusBar';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [textInputStatus, setTextInputStatus] = useState('untouch');
  const [searchApi, results, errorMessage] = useMovies();

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader title="Search" leftButtonName="arrow-left" />
      <View style={styles.container}>
        <SearchBar
          term={searchTerm}
          placeHolder="Enter keyword to search"
          textInputStatus={textInputStatus}
          onTermChange={searchKeyword => {
            setSearchTerm(searchKeyword);
            setTextInputStatus('touched');
          }}
          onSubmit={() => searchApi(searchTerm)}
          onCancel={() => {
            setSearchTerm('');
            setTextInputStatus('untouch');
          }}
        />
        {errorMessage !== '' ? <Text> {errorMessage} </Text> : null}
        <Text style={styles.resultStyle}>
          We found {results.length} results
        </Text>
        {results.length > 0 ? <VMovieList results={results} /> : null}
      </View>
    </>
  );
};

export default memo(Search);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    flex: 1,
  },
  resultStyle: {
    marginVertical: 15,
  },
});

import React, {useState, memo, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import SearchBar from '../components/SearchBar';
import VMovieList from '../components/VMovieList';
import useMovies from '../context/useMovies';
import CustomStatusBar from '../components/CustomStatusBar';
import { connect, useDispatch } from 'react-redux'
import { MOVIE_TYPE } from '../commons/types'
import { startLoading, stopLoading } from '../actions/rootActions'
import Loading from '../components/Loading';
import DefaultError from '../components/DefaultError';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [textInputStatus, setTextInputStatus] = useState('untouch');
  const [searchMovieList, setSearchMovieList] = useState([])
  const dispatch = useDispatch()

  const searchApi = (searchTerm) => {
    if(props.availableNetwork) {
    dispatch(startLoading())
    dispatch({type: MOVIE_TYPE.SEARCH, payload: {
      optionalQuery: `&query=${encodeURIComponent(searchTerm)}`,
      searchTerm: searchTerm,
      cb: (res) => {
        dispatch(stopLoading())
        if (res.success) {
          setSearchMovieList(res.data.results)
        } 
      }
    }})
  }
  }


  const handleErr = () => {
      return (
        <View style={{ flex: 1}}>
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
        <Text style={styles.resultStyle}>
          We found {searchMovieList.length} results
        </Text>
        {searchMovieList.length > 0 ? <VMovieList results={searchMovieList} /> : null}
      </View>
      {props.isLoading ? <Loading /> : null}
      </View>
      )
  }

  return (
    <>
    <View>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader title="Search" leftButtonName="arrow-left" />
    </View>
    {loadHomeDependsOnNetwork(props.availableNetwork, loadHomeDependsOnNetwork, handleErr)}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork
  }
}

export default connect(mapStateToProps, null)(memo(Search));

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  resultStyle: {
    marginVertical: 15,
  },
});

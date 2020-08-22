import React, { memo, useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import VMovieList from '../components/VMovieList';
import DefaultError from '../components/DefaultError';
import NetInfo from "@react-native-community/netinfo";
import { startLoading, stopLoading } from '../actions/rootActions';
import { ACCOUNT_TYPE } from '../commons/types';
import { connect, useDispatch } from 'react-redux'
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import { LIST_TYPE } from '../commons/types'
import { SwipeListView } from 'react-native-swipe-list-view';
import {renderList} from '../actions/movieAction'


const MovieListScreen = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [errMess, setErrMess] = useState('')
  const [movieList, setMovieList] = useState([])
  const [totalMovieList, setTotalMovieList] = useState(0)

  const checkNetworkAndCallApi = () => {
    if (props.availableNetwork) {
      // console.log("[MovieListScreen]"), "TRIGGER";
      // dispatch(startLoading())
      dispatch({
        type: LIST_TYPE.GET_MOVIE_LIST,
        payload: {
          sessionId: props.sessionId,
          cb: (res) => {
            console.log("Stoppppppppppp", res);
            dispatch(stopLoading())
            if (res.success) {
              // console.log("RES", res.data.results.length);
              setMovieList(res.data.results)
              setTotalMovieList(res.data.total_results)
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })
    }
  }

  const deleteList = (list_id) => {
    dispatch(startLoading())
    dispatch({
      type: LIST_TYPE.DELETE_LIST,
      payload: {
        list_id: list_id,
        sessionId: props.sessionId,
        cb: (res) => {
          dispatch(stopLoading())
          dispatch(renderList(!props.renderList))
          // if (res.success) {
          //   console.log("success", res.data );
          // } else {
          //   setErrMess(res.errMessage)
          // }
        }
      }
    })
  }

  // console.log("MOVIE LIST TOTAL", totalMovieList);

  const handleErr = () => {
    if (errMess) {
      return <DefaultError mess={errMess} checkNetworkAndCallApi={checkNetworkAndCallApi} />
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.container}>
            <View style={styles.totalList}>
              <Text style={styles.listStyle}>{totalMovieList > 1 ? totalMovieList + ' Lists' : totalMovieList + ' List'}</Text>
              <Button style={{ backgroundColor: '#90CAF9' }} color="black"
                onPress={() => navigation.push('CreateNewList')
                }>Create New List</Button>
            </View>
              <SwipeListView
                showsVerticalScrollIndicator={false}
                data={movieList}
                keyExtractor={item => item.id.toString()}
                renderItem={ ({item}) => (
                  <>
                  <View style={styles.rowFront}>
                      <Text style={{ fontSize: 18 }}
                      onPress={() => navigation.navigate('MovieListDetail', {id: item.id, list_name: item.name, description: item.description})}
                >{item.name} ({item.item_count})</Text>
                  </View>
                  </>
                )}
                renderHiddenItem={({item}) => (
                    <View style={styles.rowBack}>
                      <View style={{backgroundColor: 'red', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontWeight: '500', width: 90 , fontSize: 18, color: 'white', textAlign: 'center'}} onPress={() => deleteList(item.id)}>Delete</Text>
                      </View>
                    </View>
                )}
                rightOpenValue={-100}
              />
          </View>
          {props.isLoading ? <Loading /> : null}
        </View>
      )
    }
  }

  useEffect(() => {
    console.log("CALL AGAIN");
    checkNetworkAndCallApi()
  }, [props.availableNetwork, props.renderList, props.renderListDetail])

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader
        title="Movie List"
        leftButtonName="bars"
        rightButtonName="search"
      />
      {loadHomeDependsOnNetwork(props.availableNetwork, checkNetworkAndCallApi, handleErr)}
    </>
  );
};


const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId,
    renderList: state.movie.renderList,
    renderListDetail: state.movie.renderListDetail,
    // renderListDetail: state.movie.renderListDetail
  }
}
export default connect(mapStateToProps, null)(memo(MovieListScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
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
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-end',

    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // paddingRight: 15,
},

deleteStyle: {
  color: 'red',
  fontWeight: 'bold'
}
});

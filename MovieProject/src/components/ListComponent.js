import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomHeader from './CustomHeader';
import CustomStatusBar from './CustomStatusBar';
import VMovieList from './VMovieList';
import { connect, useDispatch } from 'react-redux'
import { MOVIE_TYPE, ROOT_TYPE, ACCOUNT_TYPE, LIST_TYPE } from '../commons/types'
import { startLoading, stopLoading } from '../actions/rootActions'
import Loading from './Loading';
import DefaultError from './DefaultError';
import { loadHomeDependsOnNetwork, showViewAfterLoading } from '../commons/commonAction'
import ResponseDefaultErr from './ResponseDefaultErr';
import { Button } from 'react-native-paper';
import { renderFavorite, renderWatchlist } from '../actions/movieAction';

const ListComponent = (props) => {
  const dispatch = useDispatch()
  const [list, setList] = useState(undefined)
  const [errMess, setErrMess] = useState('')

  const checkNetworkAndCallApi = () => {
    if (props.availableNetwork) {
      dispatch(startLoading())
      dispatch({
        type: props.type,
        payload: {
          sessionId: props.sessionId,
          optionalQuery: props.optionalQuery,
          id: props.id,
          cb: (res) => {
            dispatch(stopLoading())
            if (res.success) {
              if (props.type === LIST_TYPE.GET_LIST_DETAIL) {
                console.log("RES", res);
                setList(res.data.items)
              } else {
                setList(res.data.results)
              }

            } else {
              setErrMess(res.errMessage)
            }
          },
        }
      })
    }
  }

  const removeAction = (id) => {
    const type = props.name === "Favorite" ? MOVIE_TYPE.REMOVE_MOVIE_FROM_FAVORITE : MOVIE_TYPE.REMOVE_MOVIE_FROM_WATCHLIST
    let paramType = {}

    if (props.name === "Favorite") {
      paramType = {
        "media_type": "movie",
        "media_id": id,
        "favorite": false
      }
    } else {
      paramType = {
        "media_type": "movie",
        "media_id": id,
        "watchlist": false
      }
    }

    dispatch({
      type: type,
      payload: {
        sessionId: props.sessionId,
        params: paramType,
        cb: (res) => {
          if (res.success) {
            props.name === "Favorite"
              ? dispatch(renderFavorite(!props.renderListType)) :
              dispatch(renderWatchlist(!props.renderListType))
          } else {
            setErrMess(res.errMessage)
          }
        }
      }
    })
  }


  const mainView = () => {
    if (list && list.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {!props.isLoading ? <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 30 }}>{props.name} list is empty</Text> : null}
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>{props.name}</Text>
            <VMovieList results={list} button={true} action={id => removeAction(id)} />
          </View>
        </View>
      )
    }
  }


    const handleErr = () => {
      if (errMess) {
        return <DefaultError mess={errMess} checkNetworkAndCallApi={checkNetworkAndCallApi} />
      } else {
        return (
          <View style={{ flex: 1 }}>
            {showViewAfterLoading(props.isLoading, mainView)}
          </View>
        )
      }
    }


    useEffect(() => {
      checkNetworkAndCallApi()
    }, [props.availableNetwork, props.renderListType])

    return (
      <>
        <View style={styles.container}>
          {loadHomeDependsOnNetwork(props.availableNetwork, checkNetworkAndCallApi, handleErr)}
        </View>
      </>
    )
  }


  export default memo(ListComponent);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
    },
    errorMessageStyle: {
      color: 'red',
      marginTop: 20,
      fontSize: 16,
      textAlign: 'center',
    },
  });

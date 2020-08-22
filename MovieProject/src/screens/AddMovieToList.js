import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import CustomHeaderSave from '../components/CustomHeaderSave'
import CustomStatusBar from '../components/CustomStatusBar';
import { connect, useDispatch } from 'react-redux'
import DefaultError from '../components/DefaultError';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import { TextInput } from 'react-native-paper';
import FormInputText from '../components/FormInputText';
import { startLoading, stopLoading } from '../actions/rootActions'
import { useNavigation } from '@react-navigation/native';
import { LIST_TYPE } from '../commons/types'
import Loading from '../components/Loading';
import { renderListDetail, renderList } from '../actions/movieAction'
import VMovieList from '../components/VMovieList';
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-paper';

const AddMovieToList = (props) => {
  const movie_id = props.route.params.id
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [movieList, setMovieList] = useState([])
  const [errMess, setErrMess] = useState('')
  const [totalList, settotalList] = useState(0)
  const [checked, setChecked] = useState([])
  const [belongList, setbelongList] = useState([])
  let checkListArr = []

  const checkNetworkAndCallApi = () => {
    if (props.availableNetwork) {
      dispatch(startLoading())
      dispatch({
        type: LIST_TYPE.GET_MOVIE_LIST,
        payload: {
          sessionId: props.sessionId,
          cb: (res) => {
            dispatch(stopLoading())
            if (res.success) {
              // console.log("RES", res);
              setMovieList(res.data.results)
              settotalList(res.data.results.length)
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })

      dispatch({
        type: LIST_TYPE.GET_MOVIE_BELONG_LIST,
        payload: {
          id: props.route.params.id,
          cb: (res) => {
            dispatch(stopLoading())
            if (res.success) {
              setbelongList(res.data.results)
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })
    }
  }

  useEffect(() => {
    if (movieList.length && belongList.length) {
      // console.log("CALL AGAIN");
      setChecked(checkBoxValue())
    }
  }, [movieList, belongList,])

  useEffect(() => {
    checkNetworkAndCallApi()
  }, [props.availableNetwork])

  const checkBoxValue = () => {
    let arr = []
    let matchedList = {}
    for (let i = 0; i < movieList.length; i++) {
      matchedList = belongList.filter(item => {
        return item.id == movieList[i].id
      })[0]
      matchedList ? arr.push(matchedList) : null
    }

    let indexChecked = []
    for (let i = 0; i < movieList.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (movieList[i].id === arr[j].id) {
          indexChecked.push(i)
        }
      }
    }

    for (let i = 0; i < movieList.length; i++) {
      let skip = false
      for (let j = 0; j < indexChecked.length; j++) {
        if (indexChecked[j] === i) {
          checkListArr.push({ checked: true })
          skip = true
          break
        }
      }
      skip ? null : checkListArr.push({ checked: false })
    }
    return checkListArr
  }

  // console.log("TOGGLE", props.renderListDetail);
  const toggleCheckBox = (list_id, newValue) => {
    dispatch(startLoading())
    if (newValue) {
      dispatch({
        type: LIST_TYPE.ADD_MOVIE_TO_LIST,
        payload: {
          list_id: list_id,
          sessionId: props.sessionId,
          params: {
            "media_id": movie_id
          },
          cb: (res) => {
            dispatch(stopLoading())
            if (res.success) {
              dispatch(renderListDetail(!props.renderListDetail))
              dispatch(renderList(!props.renderList))
              // console.log((!props.renderList));
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })
    } else {
      dispatch({
        type: LIST_TYPE.REMOVE_MOVIE_TO_LIST,
        payload: {
          list_id: list_id,
          sessionId: props.sessionId,
          params: {
            "media_id": movie_id
          },
          cb: (res) => {
            dispatch(stopLoading())
            if (res.success) {
              dispatch(renderListDetail(!props.renderListDetail))
              dispatch(renderList(!props.renderList))
              // console.log((!props.renderList)); 
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })
    }
  }
  // console.log("isRendered", props.renderListDetail);

  const handleErr = () => {
    return (
      <View style={{ flex: 1 }}>
        {errMess ?
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, padding: 20 }}>{errMess}</Text> : null}
        <Button style={{ height: 40 }} color="blue"
          onPress={() => navigation.push('CreateNewList')
          }>Add New List</Button>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={movieList}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{ flex: 1, marginHorizontal: 20,}}>
                <View style={{ flexDirection: 'row' , justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                  {/* <Text>{item.id}</Text> */}
                  <CheckBox
                    boxType='square'
                    value={checked.length > 0 ? checked[index].checked : false}
                    onValueChange={(newValue) => {
                      toggleCheckBox(item.id, newValue)
                    }}
                  />
                  <Text style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>{item.name}</Text>
                </View>
              </View>
            )
          }}
        />
        {props.isLoading ? <Loading /> : null}
      </View>
    )
  }

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeaderSave leftButtonName="arrow-left" title="Add to List" />
      {loadHomeDependsOnNetwork(props.availableNetwork, checkNetworkAndCallApi, handleErr)}
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId,
    renderListDetail: state.movie.renderListDetail,
    renderList: state.movie.renderList
  }
}

export default connect(mapStateToProps, null)(memo(AddMovieToList));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },

  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
})
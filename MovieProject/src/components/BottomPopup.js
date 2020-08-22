import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button } from 'react-native-paper';
import { startLoading, stopLoading } from '../actions/rootActions'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LIST_TYPE, MOVIE_TYPE } from '../commons/types'
import Loading from '../components/Loading';
import CheckBox from '@react-native-community/checkbox';
import CustomHeaderSave from './CustomHeaderSave';
import { renderList, renderListDetail } from '../actions/movieAction'
import CustomCheckBox from '../components/CutomCheckBox';


const BottomPopup = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [movieList, setMovieList] = useState(undefined)
  const [errMess, setErrMess] = useState('')
  const [totalList, settotalList] = useState(undefined)
  const [checked, setChecked] = useState(false)
  const [belongList, setbelongList] = useState(undefined)
  const [countCompleteApi, setCountCompleteApi] = useState(0)
  let checkListArr = []
  const [privateLoading, setprivateLoading] = useState('false')
  const [movieIdAndCheckBox, setmovieIdAndCheckBox] = useState({})
  const [countCheckBoxReturn, setcountCheckBoxReturn] = useState(0)
  const [ready, setready] = useState(false)
  const [final, setFinal] = useState(undefined)


  const initCallApiForList = () => {
    setprivateLoading(true)
    dispatch({
      type: LIST_TYPE.GET_MOVIE_LIST_FOR_POPUP,
      payload: {
        sessionId: props.sessionId,
        cb: (res) => {
          if (res.success) {
            setMovieList(res.data.results)
            settotalList(res.data.results.length)
            setCountCompleteApi(countCompleteApi => countCompleteApi + 1)
          } else {
            setErrMess(res.errMessage)
          }
        }
      }
    })
  }

  useEffect(() => {
    if (countCompleteApi == 1) {
      setCountCompleteApi(0)
      setmovieIdAndCheckBox({...movieIdAndCheckBox, results: [{"list_id": "a", "belongs": "b"}]})
      let newResult = []
      for (let i = 0; i < totalList; i++) { 
        dispatch({
          type: MOVIE_TYPE.CHECK_MOVIE_BELONGS_TO_LIST,
          payload: {
            list_id: movieList[i].id,
            optionalQuery: `&movie_id=${props.movie_id}`,
            cb: (res, list_id) => {
              if (res.success) {
                setcountCheckBoxReturn(countCheckBoxReturn => countCheckBoxReturn + 1)
                newResult.push({"list_id": list_id, "belongs": res.data.item_present})
                setmovieIdAndCheckBox({...movieIdAndCheckBox, results: newResult})
              } else {
                console.log("some err");
              }
            }
          }
        })
      }
   
    }
  }, [countCompleteApi])

  useEffect(() => {
    initCallApiForList()
  }, [props.renderListDetail, props.renderList])

  useEffect(() => {
    if(totalList) { 
        let length = movieIdAndCheckBox.results ? movieIdAndCheckBox.results.length : 0;
        if(length == totalList) {
          setready(true)
          setprivateLoading(false)
          setFinal(movieIdAndCheckBox)
        }
    }
  }, [movieIdAndCheckBox, totalList])


  const toggleCheckBox = (list_id, newValue) => {
    setprivateLoading(true)
    if (newValue) {
      dispatch({
        type: LIST_TYPE.ADD_MOVIE_TO_LIST,
        payload: {
          list_id: list_id,
          sessionId: props.sessionId,
          params: {
            "media_id": props.movie_id
          },
          cb: (res) => {
            setprivateLoading(false)
            if (res.success) {
              dispatch(renderListDetail(!props.renderListDetail))
              dispatch(renderList(!props.renderList))
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
            "media_id": props.movie_id
          },
          cb: (res) => {
            if (res.success) {
              setprivateLoading(false)
              dispatch(renderListDetail(!props.renderListDetail))
              dispatch(renderList(!props.renderList))
            } else {
              setErrMess(res.errMessage)
            }
          }
        }
      })
    }
  }

  const boxReturn = (list_id) => {
    if(final){
      // for (let index = 0; index < final.results.length; index++) {
      //   if(final.results[index].list_id === list_id) {
      //     console.log("[R1 = ]",final.results[index].belongs);
      //     // return final.results[index].belongs;
      //   } 
      // }

      let filteredValueCheckBox  = []
      filteredValueCheckBox = final.results.filter(item => {
        return item.list_id === list_id
      })

      if(filteredValueCheckBox.length > 0) {
        if(filteredValueCheckBox[0].belongs){
        return filteredValueCheckBox[0].belongs
      }} else {
        return false
      } 
    }
  }
 

  const waitLoading = () => {
    return (
      <View style={{ flex: 1, marginBottom: 50 }}>
        <CustomHeaderSave leftButtonName='times' leftAction={props.cb} rightButtonName="ADD NEW LIST" rightAction={() => navigation.push('CreateNewList')} />
        {errMess ?
          <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, padding: 20, }}>{errMess}</Text>
          : null}
        {movieIdAndCheckBox ? 
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            data={movieList}
            extraData={final}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{ flex: 1, marginHorizontal: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <CustomCheckBox check={boxReturn(item.id)} 
                    toggleCheckBox={(newValue) => {toggleCheckBox(item.id, newValue)}} />
                    <Text style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>{item.name}</Text>
                  </View>
                </View>
              )
            }
            }
          />
        </View> 
        : null}
      </View>)
  }


  return (
    <View style={styles.outlineLayer}>
      <View style={styles.opacityLayer}></View>
      <View style={styles.listLayer}>
       {waitLoading()}
      </View>
      {privateLoading ? <Loading /> : null}
    </View>
  )
}


export default memo(BottomPopup);

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

  outlineLayer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },

  opacityLayer: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.5, alignItems: 'center', justifyContent: 'center',
  },

  listLayer: {
    ...StyleSheet.absoluteFillObject, flex: 1, top: "60%", backgroundColor: 'white', opacity: 1,
  },
})
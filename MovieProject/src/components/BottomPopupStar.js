import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button } from 'react-native-paper';
import { startLoading, stopLoading } from '../actions/rootActions'
import { useNavigation } from '@react-navigation/native';
import { MOVIE_TYPE } from '../commons/types'
import Loading from './Loading';
import CheckBox from '@react-native-community/checkbox';
import CustomHeaderSave from './CustomHeaderSave';
import { renderList, renderListDetail, renderRate, renderWatchlist } from '../actions/movieAction'
import { Rating, AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const BottomPopupStar = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [errMess, setErrMess] = useState('')
  const [currentRateValue, setCurrentRateValue] = useState(0)
  const [disableVote, setdisableVote] = useState(true)


  const ratingCompleted = (rating) => {
    console.log("mark",props.watchList);
    dispatch(startLoading())
    dispatch({
      type: MOVIE_TYPE.RATE_MOVIE,
      payload: {
        movie_id: props.movie_id,
        sessionId: props.sessionId,
        params: {
          "value": Math.round(rating) * 2
        },
        cb: (res) => {
          dispatch(stopLoading())
          if (res.success) {
            dispatch(renderRate(!props.renderRate))
            props.cb()
            if(props.watchList){
              console.log("ABC");
              dispatch({
                type: MOVIE_TYPE.ADD_MOVIE_TO_WATCH_LIST,
                payload: {
                  id: props.movie_id,
                  sessionId: props.sessionId,
                  cb: (res) => {
                    if (res.success) {
                      dispatch(renderWatchlist(!props.renderWatchlist))
                      props.cb()
                    } else {
                      setErrMess(res.errMessage)
                    }
                  }
                }
              })
            // } else {
            //   props.cb()
            }
          } else {
            setErrMess(res.errMessage)
          }
        }
      }
    })
  }

  const deleteRating = () => {
    dispatch({
      type: MOVIE_TYPE.DELETE_RATE,
      payload: {
        movie_id: props.movie_id,
        sessionId: props.sessionId,
        cb: (res) => {
          dispatch(stopLoading())
          if (res.success) {
            dispatch(renderRate(!props.renderRate))
            props.cb()
          } else {
            setErrMess(res.errMessage)
          }
        }
      }
    })

    console.log("Delete Rating")
  }

  const waitLoading = () => {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeaderSave leftButtonName='times' leftAction={props.cb} />
        <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}>
          {errMess ?
            <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, padding: 20 }}>{errMess}</Text>
            : null}


          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => deleteRating()}>
              <FontAwesome5Icon style={styles.iconStyle} name="minus-circle" />
            </TouchableOpacity>
            <AirbnbRating
              count={5}
              imageSize={50}
              defaultRating={props.rateValue / 2}
              onFinishRating={(rating) => {
                setCurrentRateValue(rating)
                setdisableVote(false)
              }}
              showRating={false}
            />
          </View>

          <Button disabled={disableVote} style={{ backgroundColor: '#90CAF9', height: 40, width: "30%",padding: 2, marginTop: 15, alignSelf: 'center'}} color="black"
            onPress={() => ratingCompleted(currentRateValue)
            }>VOTE</Button>
        </View>
        {props.isLoading ? <Loading /> : null}
      </View>)
  }

  return (
    <View style={styles.outlineLayer}>
      <View style={styles.opacityLayer}></View>
      <View style={styles.listLayer}>
        {!props.isLoading ? waitLoading() : null}
      </View>
    </View>
  )
}


export default memo(BottomPopupStar);

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
  iconStyle: {
    fontSize: 25,
    marginRight: 15,
    color: 'red'
  },
})
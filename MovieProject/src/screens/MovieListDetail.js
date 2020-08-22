import React, { memo, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { LIST_TYPE } from '../commons/types'
import VMovieList from '../components/VMovieList';
import { connect, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../actions/rootActions'
import Loading from '../components/Loading';
import DefaultError from '../components/DefaultError';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import { Button } from 'react-native-paper';
import CustomHeaderSave from '../components/CustomHeaderSave'
import CustomStatusBar from '../components/CustomStatusBar';
import VListWithButton from '../components/VListWithButton';
import { useNavigation } from '@react-navigation/native';
import { renderList, renderListDetail } from '../actions/movieAction';

const MovieListDetail = (props) => {
  const list_id = props.route.params.id
  const list_name = props.route.params.list_name
  const list_description = props.route.params.description
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [list, setList] = useState()
  const [errMess, setErrMess] = useState('')

  const checkNetworkAndCallApi = () => {
    if (props.availableNetwork) {
      // console.log("[MovieListDetail]"), "TRIGGER";
      dispatch(startLoading())
      dispatch({
        type: LIST_TYPE.GET_LIST_DETAIL,
        payload: {
          sessionId: props.sessionId,
          optionalQuery: null,
          id: list_id,
          cb: (res) => {
            // console.log("RES", res);
            if (res.success) {
                setList(res.data.items)
              dispatch(stopLoading())
            } else {
              // console.log("fail");
              setErrMess(res.errMessage)
            }
          },
        }
      })
    }
  }

  const clearList = () => {
    Alert.alert(
      "Clear List",
      "Do you want to remove all movies?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => confirmClearList() }
      ],
      { cancelable: false }
    );
  }

  const confirmClearList = () => {
      dispatch({
        type: LIST_TYPE.CLEAR_LIST,
        payload: {
          sessionId: props.sessionId,
          optionalQuery: '&confirm=true',
          id: list_id,
          cb: (res) => {
            if (res.success) {
              setList([])
              dispatch(renderList(!props.renderList))
            } else {
              setErrMess(res.errMessage)
            }
          },
        }
      })
  }

  const removeAction = (id) => {
    dispatch({
      type: LIST_TYPE.REMOVE_MOVIE_TO_LIST,
      payload: {
        list_id: list_id,
        sessionId: props.sessionId,
        params: {
          "media_id": id
        },
        cb: (res) => {
          if (res.success) {
            dispatch(renderList(!props.renderList))
            dispatch(renderListDetail(!props.renderListDetail))  
          } else {
            setErrMess(res.errMessage)
          }
        }
      }
    })
  }



  // console.log(props.renderList)


  const handleErr = () => {
    if (errMess) {
      return <DefaultError mess={errMess} checkNetworkAndCallApi={checkNetworkAndCallApi} />
    } else {
      if (list && list.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!props.isLoading ? (
              <View>
                <Text style={{ fontSize: 16, textAlign: 'center', marginHorizontal: 30 }}>{list_name} list is empty</Text> 
                <Button  style={{marginTop: 10}} color="blue" onPress={() => navigation.push('Home')}>Add Movie Now</Button>
              </View>)
            : null}
            {props.isLoading ? <Loading /> : null}
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>
            {!props.isLoading ? (
            <View style={styles.container}>
                <View style={{
                  alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 10
                }}>
                  <Text style={styles.mainTitle}>{list_name}</Text>
                  <Button style={{ backgroundColor: "#FF8784", flex: 1 }} color="black"
                    onPress={() => clearList()
                    }>Clear All</Button>
                </View>
                  {list_description ? <Text style={{marginHorizontal: 10, marginBottom: 7}}>{list_description}</Text> : null }
              <VMovieList results={list} button={true}  action={id => removeAction(id)}/>
            </View>
          ) : null}
            {props.isLoading ? <Loading /> : null}
          </View>
        )
      }
    }
  }

  useEffect(() => {
    checkNetworkAndCallApi()
  }, [props.availableNetwork, props.renderListDetail])

  return (
    <>
     <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeaderSave leftButtonName="arrow-left" leftAction={() => navigation.pop()} title="List Detail" />
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
  }
}


export default connect(mapStateToProps, null)(memo(MovieListDetail));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,

  },
  mainTitle: {
    flex: 4,
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


{/* <ListComponent
        id={list_id}
        availableNetwork={props.availableNetwork}
        type={LIST_TYPE.GET_LIST_DETAIL}
        sessionId={null}
        optionalQuery={null}
        isLoading={props.isLoading}
        renderListType={props.renderListDetail}
        name={list_name}
        clearList={true} /> */}


    
import React, { memo, useEffect, useState } from 'react';
import { View, Text , StyleSheet} from 'react-native'
import CustomHeaderSave from '../components/CustomHeaderSave'
import CustomStatusBar from '../components/CustomStatusBar';
import { connect, useDispatch } from 'react-redux'
import DefaultError from '../components/DefaultError';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import { TextInput } from 'react-native-paper';
import FormInputText from '../components/FormInputText';
import { startLoading, stopLoading } from '../actions/rootActions'
import { useNavigation } from '@react-navigation/native';
import {LIST_TYPE} from '../commons/types'
import Loading from '../components/Loading';
import {renderList} from '../actions/movieAction'

const CreateNewList = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [errMess, setErrMess] = useState('')

    const createNewList = () => {
        // console.log("name", name, description);
        dispatch(startLoading())
        dispatch({
          type: LIST_TYPE.CREATE_NEW_LIST, payload: {
            sessionId: props.sessionId,
            params: {
              name: name,
              description: description
            },
            cb: (res) => {
              dispatch(stopLoading())
              if (res.success) {
                dispatch(renderList(!props.renderList))
                navigation.pop()
              } else {
                setErrMess(res.errMessage)                
              }
            }
          }
        })
    }


    const handleErr = () => {
          return (
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <TextInput
                placeholder="Name"
                // label="Name"
                style={{backgroundColor: "transparent"}}
                onChangeText={(text) => setname(text)}
                />
                <TextInput
                placeholder="Desciption"
                label="Description"
                style={{backgroundColor: "transparent"}}
                onChangeText={(text) => setdescription(text)}
                />
                {errMess ? <Text style={{textAlign: 'center', color: 'red', paddingVertical: 20}}>{errMess}</Text> : null }
                </View>
              {props.isLoading ? <Loading /> : null}
            </View>
          )
      }

    return (
        <>
            <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
            <CustomHeaderSave leftButtonName="times" leftAction={()=> navigation.pop()} title="Create List" rightButtonName="SAVE" rightAction={() => createNewList()}/>
            {loadHomeDependsOnNetwork(props.availableNetwork, loadHomeDependsOnNetwork, handleErr)}
        </>
    )
}

const mapStateToProps = state => {
    return {
      isLoading: state.root.isLoading,
      availableNetwork: state.root.availableNetwork,
      sessionId: state.root.sessionId,
      renderList: state.movie.renderList
    }
  }

  export default connect(mapStateToProps, null)(memo(CreateNewList));

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
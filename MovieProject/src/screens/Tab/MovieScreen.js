import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Alert,
  RefreshControl,
  Platform
  ,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusBar from '../../components/CustomStatusBar';
import DefaultError from '../../components/DefaultError'
import { ScrollView } from 'react-native-gesture-handler';
import HMovieList from '../../components/HMovieList';
import { startClock } from 'react-native-reanimated';
import { startLoading, stopLoading, toggleNetwork, createSessionId } from '../../actions/rootActions'
import Loading from '../../components/Loading';
import { MOVIE_TYPE, ROOT_TYPE, ACCOUNT_TYPE } from '../../commons/types'
import { useNavigationState } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { loadHomeDependsOnNetwork, showViewAfterLoading } from '../../commons/commonAction';
import ResponseDefaultErr from '../../components/ResponseDefaultErr';
import AsyncStorage from '@react-native-community/async-storage';


const MovieScreen = (props) => {
  const dispatch = useDispatch()

  const [refreshing, setRefreshing] = React.useState(false);
  const [latestMovie, setLatestMovie] = useState({})
  const [playingMovies, setPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [countCompletedApi, setCountCompletedApi] = useState(0)
  const [latestErrMess, setlatestErrMess] = useState('')
  const [nowPlayingErrMess, setnowPlayingErrMess] = useState('')
  const [upcomingErrMess, setupcomingErrMess] = useState('')
  const [topRatedErrMess, settopRatedErrMess] = useState('')
  const [popularErrMess, setpopularErrMess] = useState('')
  const [finishSetupAutoSessionId, setFinishSetupAutoSessionId] = useState('')


  const checkNetworkAndCallApi = () => {
    if (props.availableNetwork) {
      dispatch(startLoading())
      dispatch({
        type: MOVIE_TYPE.GET_LATEST, payload: {
          cb: (res) => {
            if (res.success) {
              setLatestMovie(res.data)
            } else {
              setlatestErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          },
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_PLAYING, payload: {
          cb: (res) => {
            if (res.success) {
              setPlayingMovies(res.data.results)
            } else {
              setnowPlayingErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_UPCOMING, payload: {
          cb: (res) => {
            if (res.success) {
              setUpcomingMovies(res.data.results)
            } else {
              setupcomingErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_TOP_RATED, payload: {
          cb: (res) => {
            if (res.success) {
              setTopRatedMovies(res.data.results)
            } else {
              settopRatedErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_POPULAR, payload: {
          cb: (res) => {
            if (res.success) {
              setPopularMovies(res.data.results)
            } else {
              setpopularErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })
    }
  }


  const getSessionId = async () => {
    const sessionId = await AsyncStorage.getItem('sessionId')
    console.log("session", sessionId);
    if (sessionId) {
      dispatch(createSessionId(sessionId))
      dispatch({
        type: ACCOUNT_TYPE.GET_ACCOUNT_DETAIL, payload: {
          sessionId: sessionId,
          cb: (res) => {
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })
    }
  }

  useEffect(() => {
    checkNetworkAndCallApi()
    getSessionId()
  }, [props.availableNetwork])


  useEffect(() => {
    if (countCompletedApi === 6) {
      setCountCompletedApi(0)
      dispatch(stopLoading())
    }
  }, [countCompletedApi])



  const latestMovieImage = () => {
    if (latestMovie.backdrop_path) {
      return `https://image.tmdb.org/t/p/original/${latestMovie.backdrop_path}`
    }
    return 'https://image.freepik.com/free-vector/coming-soon-typography-style-vector_53876-56733.jpg'
  }

  const latestErr = () => {
    if (latestErrMess) {
      return <ResponseDefaultErr errMess={latestErrMess} />
    } else {
      return (
        <View style={styles.mainThumbContainer}>
          <Image
            style={styles.mainThumb}
            source={{
              uri: latestMovieImage()
            }}
          />
          <Text style={styles.mainMovieText}>{latestMovie.title}</Text>
        </View>
      )
    }
  }

  const nowPlayingErr = () => {
    if (nowPlayingErrMess) {
      return <ResponseDefaultErr errMess={nowPlayingErrMess} />
    } else {
      return <HMovieList title="Now Playing" results={playingMovies} />
    }
  }

  const upcomingErr = () => {
    if (upcomingErrMess) {
      return <ResponseDefaultErr errMess={upcomingErrMess} />
    } else {
      return <HMovieList title="Upcoming" results={upcomingMovies} />
    }
  }

  const topRatedErr = () => {
    if (topRatedErrMess) {
      return <ResponseDefaultErr errMess={topRatedErrMess} />
    } else {
      return <HMovieList title="Top Rated" results={topRatedMovies} />
    }
  }

  const popularErr = () => {
    if (popularErrMess) {
      return <ResponseDefaultErr errMess={popularErrMess} />
    } else {
      return <HMovieList title="Most Popular" results={popularMovies} />
    }
  }

  const mainView = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
        {latestErr()}
        {nowPlayingErr()}
        {upcomingErr()}
        {topRatedErr()}
        {popularErr()}
      </ScrollView>
    )

  }

  const handleErr = () => {
    if (latestErr && nowPlayingErrMess && upcomingErrMess && topRatedErrMess && popularErrMess) {
      return <DefaultError mess="Unable to load data" checkNetworkAndCallApi={checkNetworkAndCalApi} />
    } else {
      return (
        <View style={{ flex: 1 }}>
          {showViewAfterLoading(props.isLoading, mainView)}
        </View>
      )
    }
  }

  return (
    <>
      <View>
        <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
        <CustomHeader title="Movie" leftButtonName="bars" rightButtonName="search" />
      </View>
      {loadHomeDependsOnNetwork(props.availableNetwork, checkNetworkAndCallApi, handleErr)}

    </>
  );
};


// const mapDispatchToProps = dispatch => ({
//   // saga
//   _pressLoginUser1: (email, password) => {
//       dispatch(startLoading())
//       dispatch({type: LOGIN, payload: {email, password}})
//       // dispatch({type: LOGIN, payload: {email: "Alicerose19th", password: "Alicedep1"}})
//   },
// })

const mapStateToProps = state => {
  return {
    latestMovie: state.movie.latestMovie,
    playingMovies: state.movie.playingMovies,
    upcomingMovies: state.movie.upcomingMovies,
    topRatedMovies: state.movie.topRatedMovies,
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId,
  }
}


export default connect(mapStateToProps, null)(memo(MovieScreen));

const styles = StyleSheet.create({
  mainThumbContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  mainThumb: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width) / 2,
    resizeMode: 'stretch'
  },

  mainMovieText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },



});

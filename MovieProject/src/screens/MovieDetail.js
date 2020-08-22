import React, { useEffect, useLayoutEffect, useState, memo } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux'
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MovieTextDetail from '../components/MovieTextDetail';
import Video from 'react-native-video';
import { MOVIE_TYPE, ROOT_TYPE } from '../commons/types'
import { startLoading, stopLoading } from '../actions/rootActions'
import { renderFavorite, renderWatchlist } from '../actions/movieAction'
import { WebView } from 'react-native-webview';

import Loading from '../components/Loading';
import DefaultError from '../components/DefaultError';
import BottomPopup from '../components/BottomPopup';
import { Avatar, Button } from 'react-native-paper';
import ActionButton from '../components/ActionButton';
import CastList from '../components/CastList';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import ResponseDefaultErr from '../components/ResponseDefaultErr';
import { useNavigation } from '@react-navigation/native';
import BottomPopupStar from '../components/BottomPopupStar';


const MovieDetail = (props) => {
  // const { id } = 357828;
  const { id } = props.route.params
  const sessionId = props.sessionId
  const isLoading = props.isLoading
  // const renderRate = props.renderRate
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [result, setResult] = useState({});
  const [languageList, setLanguageList] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [numberLines, setNumberLines] = useState(3);
  const [viewOption, setViewOption] = useState('View More');
  const [countCompletedApi, setCountCompletedApi] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [watchList, setWatchlist] = useState(false)
  const [castList, setCastList] = useState([]);
  const [overViewErrMess, setOverViewErrMess] = useState(undefined)
  const [castErrMess, setCastErrMess] = useState(undefined)
  const [trailerErrMess, setTrailerErrMess] = useState(undefined)
  const [showList, setShowList] = useState(false)
  const [showRate, setShowRate] = useState(false)
  const [rate, setRate] = useState(false)
  const [rateValue, setRateValue] = useState(0)

  // console.log("SESSION", sessionId);
  const checkNetworkAndCallApi = () => {
    // console.log("CALL AGAINNNNNNNN")

    if (props.availableNetwork) {
      // console.log("[MovieDetail]"), "TRIGGER";
      dispatch(startLoading())
      dispatch({
        type: MOVIE_TYPE.GET_MOVIE_DETAIL, payload: {
          id: id,
          cb: (res) => {
            // console.log("A5");
            if (res.success) {
              setResult(res.data)
            } else {
              // setOverViewErrMess("AAAA")
              setOverViewErrMess(res.errMessage)
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: ROOT_TYPE.GET_LANGUAGE_LIST, payload: {
          cb: (res) => {
            // console.log("A4");
            setLanguageList(res.data)
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_TRAILER, payload: {
          id: id,
          cb: (res) => {
            // console.log("A3");
            if (res.success) {
              if (res.data.results.length > 0) {
                setTrailerKey(res.data.results[0].key)
              }
            } else {
              setTrailerErrMess(res.errMessage)
              // setTrailerErrMess("VVVVVVV")
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.MOVIE_STATE, payload: {
          id: id,
          sessionId: props.sessionId,
          cb: (res) => {
            if (res.success) {
              // console.log("A2");
              setFavorite(res.data.favorite)
              setWatchlist(res.data.watchlist)
              if (res.data.rated !== false) {
                setRate(true)
                setRateValue(res.data.rated.value)
              } else {
                setRate(false)
                setRateValue(0)
              }
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })

      dispatch({
        type: MOVIE_TYPE.GET_MOVIE_CREDIT, payload: {
          id: id,
          cb: (res) => {
            if (res.success) {
              // console.log("A1");
              // console.log("[RES STATE 2]", res)
              setCastList(res.data.cast)
            } else {
              setCastErrMess(res.errMessage)
              // setCastErrMess("BBBBB")
            }
            setCountCompletedApi(countCompletedApi => countCompletedApi + 1)
          }
        }
      })
    }
  }

  const toggleMarkFavorite = () => {
    dispatch({
      type: MOVIE_TYPE.MARK_AS_FAVORITE, payload: {
        id: id,
        favorite: favorite,
        sessionId: props.sessionId,
        cb: (res) => {
          if (res.success) {
            setFavorite(!favorite)
            dispatch(renderFavorite(!props.renderFavorite))
          }
        }
      }
    })
  }

  // console.log("value 2", !props.renderWatchlist );
  const toggleMarkWatchlist = () => {
    dispatch({
      type: MOVIE_TYPE.MARK_AS_WATCH_LIST, payload: {
        id: id,
        watchlist: watchList,
        sessionId: props.sessionId,
        cb: (res) => {
          if (res.success) {
            setWatchlist(!watchList)
            dispatch(renderWatchlist(!props.renderWatchlist))
          }
        }
      }
    })
  }

  useEffect(() => {
    checkNetworkAndCallApi()
  }, [props.availableNetwork, props.renderRate, props.renderWatchlist, props.renderFavorite])


  useEffect(() => {
    // console.log("count", countCompletedApi);
    if (countCompletedApi === 5) {
      setCountCompletedApi(0)
      dispatch(stopLoading())
    }
  }, [countCompletedApi])

  const clickView = () => {
    if (numberLines === 0) {
      setNumberLines(3);
      setViewOption('View More');
    } else {
      setNumberLines(0);
      setViewOption('View Less');
    }
  };

  const movieImage = () => {
    if (result.backdrop_path) {
      return `https://image.tmdb.org/t/p/original/${result.backdrop_path}`
    }
  
    return 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg'
  }

  const arrDescriptionCombine = (arr) => {
    if (arr.length > 0) {
      let text = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr.length - 1 === i) {
          text += arr[i].name;
        } else {
          text += arr[i].name + ", ";
        }
      }
      return text
    } else {
      return "N/A"
    }
  }

  const runtimeFormat = (rawTime) => {
    const hour = String(parseInt(rawTime / 60))
    const minute = String(rawTime % 60)

    let hourTxt = ''
    switch (hour) {
      case "0":
        hourTxt = ''
        break
      case "1":
        hourTxt = hour + ' hour'
        break
      default:
        hourTxt = hour + ' hours'
    }


    let minuteTxt = ''
    switch (minute) {
      case "0":
        minuteTxt = ''
        break
      case "1":
        minuteTxt = minute + ' minute'
        break
      default:
        minuteTxt = minute + ' minutes'
    }
    return hourTxt + ' ' + minuteTxt
  }


  const originLanguage = (langAbbreviation) => {
    if (languageList.length > 0) {
      for (let i = 0; i < languageList.length; i++) {
        if (languageList[i].iso_639_1 === langAbbreviation) {
          return languageList[i].english_name
        }
      }
    } else {
      return "N/A"
    }
  }
  // console.log("watchlist -- ", watchList);
  // console.log("favorite -- ", favorite);

  const overViewErr = () => {
    if (overViewErrMess) {
      return <ResponseDefaultErr errMess={overViewErrMess} />
    } else {
      return (
        <View style={styles.overviewPart}>
          <Text style={styles.title}>{result.title}</Text>
          <View style={styles.titleAndStatus}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <ActionButton
                name='heart'
                placeholder="Favorite"
                color={favorite ? '#da197d' : 'white'}
                markMovie={() => toggleMarkFavorite()} />
              <ActionButton name='gem' placeholder="Watchlist" color={watchList ? 'red' : 'white'}
                markMovie={() => toggleMarkWatchlist()}
              />
              <ActionButton name='star'
                placeholder="Rate"
                color={rate ? '#F5BD1F' : 'white'}
                markMovie={() => setShowRate(true)} />
              <Button style={{ backgroundColor: '#90CAF9', marginLeft: 30, height: 40, padding: 2, marginRight: 10 }} color="black"
                onPress={() => setShowList(true)
                }>Add To List</Button>
            </View>

          </View>

          <Text numberOfLines={numberLines} style={styles.overview}>
            {result.overview}
          </Text>
          <TouchableOpacity onPress={clickView}>
            <Text style={styles.showViewMoreLess}>{viewOption}</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: '#d8d8d8', height: 20 }}>
          </View>

          <View style={styles.detailStyle}>
            {/* <MovieTextDetail title="ID" value={result.id} />
            <MovieTextDetail title="IMDB ID" value={result.imdb_id ? result.imdb_id : "N/A"} /> */}
            {/* <MovieTextDetail title="Popularity" value={result.popularity ? result.popularity : "N/A"} /> */}
            {/* <MovieTextDetail title="Restriction" value={result.adult ? 'C18 - Not available for audience below 18' : 'Available for all age'} /> */}
            <MovieTextDetail title="Release Date" value={result.release_date ? result.release_date : "N/A"} />
            {result.original_title !== result.title ? <MovieTextDetail title="Original Title" value={result.original_title} /> : null}
            <MovieTextDetail title="Runtime" value={result.runtime ? runtimeFormat(result.runtime) : "N/A"} />
            <MovieTextDetail title="Genres" value={result.genres ? arrDescriptionCombine(result.genres) : "N/A"} />
            <MovieTextDetail title="Vote Average" value={result.vote_average ? `${result.vote_average} (${result.vote_count} votes)` : "N/A"} />
            <MovieTextDetail title="Original Language" value={result.original_language !== "en" ? originLanguage(result.original_language) : "English"} />
            <MovieTextDetail title="Production Companies" value={result.production_companies ? arrDescriptionCombine(result.production_companies) : "N/A"} />
          </View>
        </View>
      )
    }
  }

  const castErr = () => {
    if (castErrMess) {
      return <ResponseDefaultErr errMess={castErrMess} />
    } else {
      return <CastList results={castList} />
    }
  }


  const trailerErr = () => {
    if (trailerErrMess) {
      return <ResponseDefaultErr errMess={trailerErrMess} />
    } else {
      return (
        trailerKey ? <WebView
          style={styles.videoStyle}
          source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
        /> : <Image style={styles.image} source={{ uri: movieImage() }} />
      )
    }
  }


  // console.log("[Movie Detail]", props.isLoading);

  const handleErr = () => {
    if (overViewErrMess && castErrMess && trailerErr) {
      return <DefaultError mess="Unable to load data" checkNetworkAndCallApi={checkNetworkAndCallApi} />
    } else {
        return (
            <View style={styles.movieDetail}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
              <View style={{ flex: 1, marginBottom: 20 }}>
                {trailerErr()}
              </View>
              {overViewErr()}
              <View style={{ flex: 1, marginBottom: 20 }}>
                {castErr()}
              </View>
            </ScrollView>
            {showList ? <BottomPopup movie_id={id} sessionId={sessionId} renderListDetail={props.renderListDetail !== undefined ? props.renderListDetail : false}
              renderList={props.renderList !== undefined ? props.renderList : false} isLoading={isLoading} cb={() => setShowList(false)} /> : null}
            {showRate ? <BottomPopupStar movie_id={id} rateValue={rateValue} sessionId={sessionId} isLoading={isLoading} watchList={watchList !== undefined ? watchList : false} 
              renderRate={props.renderRate !== undefined ? props.renderRate : false}  renderWatchlist={props.renderWatchlist !== undefined ? props.renderWatchlist : false} cb={() => setShowRate(false)} /> : null}
                
          </View>
  
          
          
        )
      }
  }
  // console.log("count", countCompletedApi);
  // console.log("PROP LOADING1", props.isLoading);
  return (
    <>
      <View>
        <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
        <CustomHeader leftButtonName="arrow-left" title="Movie Detail" rightButtonName='search' />
      </View>

      <View style={{flex: 1}}>
      {loadHomeDependsOnNetwork(props.availableNetwork, checkNetworkAndCallApi, handleErr)}
      {props.isLoading ? <Loading /> : null}
    </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    sessionId: state.root.sessionId,
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    renderFavorite: state.movie.renderFavorite,
    renderWatchlist: state.movie.renderWatchlist,
    renderListDetail: state.movie.renderListDetail,
    renderList: state.movie.renderList,
    renderRate: state.movie.renderRate
  }
}

export default connect(mapStateToProps, null)(memo(MovieDetail))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8d8d8',
  },

  movieDetail: {
    flex: 1,
  },

  showViewMoreLess: {
    marginLeft: 15,
    color: 'blue',
    fontWeight: 'bold',
    paddingBottom: 15,
  },

  overviewPart: {
    flex: 1,
    backgroundColor: 'white',
  },

  detailStyle: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 20
  },

  overview: {
    marginTop: 10,
    marginHorizontal: 15,
  },

  image: {
    width: Dimensions.get('screen').width,
    height: ((Dimensions.get('screen').width / 2) * 5 / 4),
    resizeMode: 'stretch',
  },

  videoStyle: {
    width: Dimensions.get('screen').width,
    height: ((Dimensions.get('screen').width / 2) * 5 / 4),
  },

  titleAndStatus: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 10
  },

  statusStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }


});

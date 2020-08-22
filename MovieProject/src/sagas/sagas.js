import { all, takeLatest, call, put, takeEvery } from 'redux-saga/effects'
// import {processAPI} from '../api/generalApiHandler'
import { MOVIE_TYPE, ROOT_TYPE, ACCOUNT_TYPE, LIST_TYPE } from '../commons/types'
import * as API from '../api/generalApiHandler'
import {successResponse, failResponse} from './DataFormat'
import * as MovieAction from '../actions/movieAction'
import { Platform } from 'react-native'
import { combineEpics } from 'redux-observable'
import {createSessionId, deleteSessionId, updateAccountDetail} from '../actions/rootActions'
import { act } from 'react-test-renderer'

function* getLatest(action) {
    try {
        const response = yield call((API.getApi('/movie/latest?', null)))
        const resFormat = successResponse('get latest movie', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
            console.log('get latest err with response', error)
            const resFormat = failResponse('get latest movie', error)
            return action.payload.cb(resFormat)
        } 
        
    }
}

function* getPlaying(action) {
    try {
        const response = yield call((API.getApi('/movie/now_playing?', null)))
        const resFormat = successResponse('get playing movies', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get playing err', error)
        const resFormat = failResponse('get playing movies', error)
        return action.payload.cb(resFormat)

        } else {
            return null
        }
    }
}

function* getUpcoming(action) {
    try {
        const response = yield call((API.getApi('/movie/upcoming?', null)))
        const resFormat = successResponse('get upcoming movies', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get upcoming err', error)
        const resFormat = failResponse('get upcoming movies', error)
        return action.payload.cb(resFormat)
        }else {
            return null
        }
    }
}

function* getTopRated(action) {
    try {
        const response = yield call((API.getApi('/movie/top_rated?', null)))
        const resFormat = successResponse('get top rated movies', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get top rated err', error)
        const resFormat = failResponse('get top rated movies', error)
        return action.payload.cb(resFormat)
    }else {
        return null
    }
    }
}

function* getPopular(action) {
    try {
        const response = yield call((API.getApi('/movie/popular?', null)))
        const resFormat = successResponse('get popular movies', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get popular err', error)
        const resFormat = failResponse('get popular movies', error)
        return action.payload.cb(resFormat)
    }else {
        return null
    }
    }
}




function* getMovieDetail(action) {
    try {
        const response = yield call((API.getApi(`/movie/${action.payload.id}?`, null)))
        const resFormat = successResponse('get movies detail', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get detail err', error)
        const resFormat = failResponse('get movies detail ', error)
        return action.payload.cb(resFormat)
        }else {
            return null
        }
    }
}

function* getLanguageList(action) {
    try {
        const response = yield call((API.getApi(`/configuration/languages?`, null)))
        const resFormat = successResponse('get lang detail', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get lang err', error)
        const resFormat = failResponse('get lang detail ', error)
        return action.payload.cb(resFormat)
    }else {
        return null
    }
    }
}

function* getTrailer(action) {
    try {
        const response = yield call((API.getApi(`/movie/${action.payload.id}/videos?`, null)))
        const resFormat = successResponse('get trailer', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('get trailer err', error)
        const resFormat = failResponse('get trailer ', error)
        return action.payload.cb(resFormat)
    }else {
        return null
    }
    }
}

function* searchMovie(action) {
    try {
        const response = yield call((API.getApiWithQuery(`/search/movie?`, action.payload.optionalQuery)))
        const resFormat = successResponse('search', response)
        return action.payload.cb(resFormat)
    } catch(error) {
        if (error.response) {
        console.log('search', error)
        const resFormat = failResponse('search', error)
        return action.payload.cb(resFormat)
    }else {
        return null
    }
    }
}

function* login(action) {
    try {
        const tokenResponse = yield call(API.getApi('/authentication/token/new?', null))
        const tokenDataAfterFormat = successResponse('/authentication/token/new?', tokenResponse)
        // console.log('[login tokenResponse]', tokenResponse, tokenDataAfterFormat, action.payload.username, action.payload.password)
       
            try {
                const validResponse = yield call(API.postApi('/authentication/token/validate_with_login?', {
                    username: action.payload.username,
                    password: action.payload.password,
                    request_token: tokenDataAfterFormat.data.request_token
                }))
                const validDataAfterFormat = successResponse('/authentication/token/validate_with_login?', validResponse)
                // console.log('[login VALID]', validDataAfterFormat)
                    try {
                        const sessionID = yield call(API.postApi('/authentication/session/new?', {
                            request_token: tokenDataAfterFormat.data.request_token
                        }))
                        const sessionDataAfterFormat = successResponse('/authentication/session/new?', sessionID)
                        yield put(createSessionId(sessionDataAfterFormat.data.session_id))
                        return action.payload.cb(sessionDataAfterFormat)
                        // console.log('[login SESSION]', sessionDataAfterFormat.data)
                    } catch (error) {
                        console.log("ERRROR AAAAAA", error)
                        const sessionDataAfterFormat = failResponse('/authentication/session/new?', error)
                        return action.payload.cb(sessionDataAfterFormat)
                    }
            } catch (error) {
                console.log("ERROR BBBBBB", error)
                const validDataAfterFormat = failResponse('/authentication/token/validate_with_login?', error)
                return action.payload.cb(validDataAfterFormat)
            }
    } catch (error) {
        console.log("ERROR CCCCC", error)
        const tokenDataAfterFormat = failResponse('/authentication/token/new?', error)
        return action.payload.cb(tokenDataAfterFormat)
    }
}

function* logout(action) {
    try {
        const response = yield call(API.deleteApi('authentication/session?', {session_id: action.payload.sessionId}))
        const responseAfterFormat = successResponse('authentication/session?', response)
        yield put(deleteSessionId())
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('authentication/session?', error)
        return action.payload.cb(responseAfterFormat)
    }
}


function* getAccountDetail(action) {
    try {
        const response = yield call(API.getApiWithSessionId('/account?',action.payload.sessionId , null))
        const responseAfterFormat = successResponse('/account?', response)
        yield put(updateAccountDetail(responseAfterFormat))
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        console.log(error);
        const responseAfterFormat = failResponse('/account?', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getFavoriteMovieList(action) {
    try {
        const response = yield call(API.getApiWithSessionId('/account/{account_id}/favorite/movies?', action.payload.sessionId, action.payload.optionalQuery))
        const  responseAfterFormat = successResponse('favorite', response)
        // console.log("AAAAAAAAAAAAAAAAAAAA");
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('favorite', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getWatchListMovieList(action) {
    try {
        const response = yield call(API.getApiWithSessionId('/account/{account_id}/watchlist/movies?',  action.payload.sessionId, action.payload.optionalQuery))
        const  responseAfterFormat = successResponse('watchlist', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('watchlist', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getMovieState(action) {  
    try {
        const response = yield call(API.getApiWithSessionId(`/movie/${action.payload.id}/account_states?`, action.payload.sessionId, null))
        const responseAfterFormat = successResponse('status', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        console.log(error);
        const responseAfterFormat = failResponse('status', error)
        return action.payload.cb(responseAfterFormat)
    }
}


function* toggleFavoriteState(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/account/{account_id}/favorite?`, action.payload.sessionId , null , {
            "media_type": "movie",
            "media_id": action.payload.id,
            "favorite": !action.payload.favorite
        }))
        const responseAfterFormat = successResponse('toggle favorite', response)
        // console.log("B1", responseAfterFormat);
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        // console.log("B2", error);
        const responseAfterFormat = failResponse('toggle favorite', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* toggleWatchlistState(action) {
    console.log("[toggleWatchlistState]");

    try {
        const response = yield call(API.postApiWithSessionId(`/account/{account_id}/watchlist?`, action.payload.sessionId , null ,{
            "media_type": "movie",
            "media_id": action.payload.id,
            "watchlist": !action.payload.watchlist
        }))
                
        const responseAfterFormat = successResponse('toggle watchlist', response)
        // console.log("B1", responseAfterFormat);
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        // console.log("B2", error);
        const responseAfterFormat = failResponse('toggle watchlist', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getMovieCredit(action) {

    try {
        const response = yield call(API.getApi(`/movie/${action.payload.id}/credits?`))
        const responseAfterFormat = successResponse('get movie credit', response)
        // console.log("B1", responseAfterFormat);
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        // console.log("B2", error);
        const responseAfterFormat = failResponse('get movie credit', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getMovieList(action) {
    try {
        const response = yield call(API.getApiWithSessionId(`/account/{account_id}/lists?`, action.payload.sessionId, null))
        const responseAfterFormat = successResponse('get movie list', response)
    console.log("KET QUA", responseAfterFormat);
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('get movie list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* createNewList(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/list?`, action.payload.sessionId, null, action.payload.params))
        const responseAfterFormat = successResponse('create new list', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('create new list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* deleteList(action) {
    try {
        const response = yield call(API.deleteApiWithSessionId(`/list/${action.payload.list_id}?`, action.payload.sessionId, null))
        const responseAfterFormat = successResponse('delete list', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('delete list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* addMovieToList(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/list/${action.payload.list_id}/add_item?`, action.payload.sessionId, null,action.payload.params))
        const responseAfterFormat = successResponse('add movie to list', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        console.log(error);
        const responseAfterFormat = failResponse('add movie to list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* removeMovieToList(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/list/${action.payload.list_id}/remove_item?`, action.payload.sessionId, null,action.payload.params))
        const responseAfterFormat = successResponse('delete movie from list', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('delete movie from list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getListDetail(action) {
    try {
        const response = yield call(API.getApi(`/list/${action.payload.id}?`, null))
        const responseAfterFormat = successResponse('get movie list detail ', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('get movie list detail ', error)
        return action.payload.cb(responseAfterFormat)
    }
}


function* getMovieBelongList(action) {
    try {
        const response = yield call(API.getApi(`/movie/${action.payload.id}/lists?`, null))
        const responseAfterFormat = successResponse('get movie list detail ', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('get movie list detail ', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* clearList(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/list/${action.payload.id}/clear?`,action.payload.sessionId ,action.payload.optionalQuery, null))
        const responseAfterFormat = successResponse('clear list', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('clear list', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* removeMovieFromFavorite(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/account/{account_id}/favorite?`, action.payload.sessionId , null , action.payload.params))
        const responseAfterFormat = successResponse('remove movie from favorite', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('remove movie from favorite', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* removeMovieFromWatchlist(action) {
    console.log("[removeMovieFromWatchlist]");
    try {
        const response = yield call(API.postApiWithSessionId(`/account/{account_id}/watchlist?`, action.payload.sessionId , null , action.payload.params))
        const responseAfterFormat = successResponse('remove movie from watchlist', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('remove movie from watchlist', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* rateMovie(action) {
    try {
        const response = yield call(API.postApiWithSessionId(`/movie/${action.payload.movie_id}/rating?`, action.payload.sessionId , null , action.payload.params))
        const responseAfterFormat = successResponse('rate movie', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('rate movie', error)
        return action.payload.cb(responseAfterFormat)
    }
}


function* deleteRating(action) {
    try {
        const response = yield call(API.deleteApiWithSessionId(`/movie/${action.payload.movie_id}/rating?`, action.payload.sessionId , null , null))
        const responseAfterFormat = successResponse('delete rate movie', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('delete rate movie', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* checkMovieBelongsToList(action) {
    try {
        const response = yield call((API.getApiWithQuery(`/list/${action.payload.list_id}/item_status?`, action.payload.optionalQuery)))
        const resFormat = successResponse('movie belongs list', response)
        return action.payload.cb(resFormat, action.payload.list_id)
    } catch(error) {
        if (error.response) {
        const resFormat = failResponse('movie belongs list', error)
        return action.payload.cb(resFormat, action.payload.list_id)
    }else {
        return null
    }
    }
}

function* addWatchlistDebug(action) {
    // console.log("[toggleWatchlistState]");

    try {
        const response = yield call(API.postApiWithSessionId(`/account/{account_id}/watchlist?`, action.payload.sessionId , null ,{
            "media_type": "movie",
            "media_id": action.payload.id,
            "watchlist": true
        }))    
        const responseAfterFormat = successResponse('add to watchlist', response)
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('add to watchlist', error)
        return action.payload.cb(responseAfterFormat)
    }
}

function* getMovieListForPopup(action) {
    try {
        const response = yield call(API.getApiWithSessionId(`/account/{account_id}/lists?`, action.payload.sessionId, null))
        const responseAfterFormat = successResponse('get movie list', response)
        console.log("POPUP", responseAfterFormat);
        return action.payload.cb(responseAfterFormat)
    } catch (error) {
        const responseAfterFormat = failResponse('get movie list', error)
        return action.payload.cb(responseAfterFormat)
    }
}



function* saga() {
    yield all([
        yield takeLatest(MOVIE_TYPE.GET_LATEST, getLatest),
        yield takeLatest(MOVIE_TYPE.GET_PLAYING, getPlaying),
        yield takeLatest(MOVIE_TYPE.GET_UPCOMING, getUpcoming),
        yield takeLatest(MOVIE_TYPE.GET_TOP_RATED, getTopRated),
        yield takeLatest(MOVIE_TYPE.GET_POPULAR, getPopular),
        yield takeLatest(MOVIE_TYPE.GET_MOVIE_DETAIL, getMovieDetail),
        yield takeLatest(ROOT_TYPE.GET_LANGUAGE_LIST, getLanguageList),
        yield takeLatest(MOVIE_TYPE.GET_TRAILER, getTrailer),
        yield takeLatest(MOVIE_TYPE.SEARCH, searchMovie),
        yield takeLatest(ACCOUNT_TYPE.LOGIN, login),
        yield takeLatest(ACCOUNT_TYPE.LOGOUT, logout),
        yield takeLatest(ACCOUNT_TYPE.GET_ACCOUNT_DETAIL, getAccountDetail),
        yield takeLatest(MOVIE_TYPE.FAVORITE_MOVIE, getFavoriteMovieList),
        yield takeLatest(MOVIE_TYPE.MOVIE_STATE, getMovieState),
        yield takeLatest(MOVIE_TYPE.MARK_AS_FAVORITE, toggleFavoriteState),
        yield takeLatest(MOVIE_TYPE.WATCH_LIST_MOVIE, getWatchListMovieList),
        yield takeLatest(MOVIE_TYPE.MARK_AS_WATCH_LIST, toggleWatchlistState),
        yield takeLatest(MOVIE_TYPE.GET_MOVIE_CREDIT, getMovieCredit),
        yield takeLatest(LIST_TYPE.GET_MOVIE_LIST, getMovieList),
        yield takeLatest(LIST_TYPE.CREATE_NEW_LIST, createNewList),
        yield takeLatest(LIST_TYPE.DELETE_LIST, deleteList),
        yield takeLatest(LIST_TYPE.ADD_MOVIE_TO_LIST, addMovieToList),
        yield takeLatest(LIST_TYPE.REMOVE_MOVIE_TO_LIST, removeMovieToList),
        yield takeLatest(LIST_TYPE.GET_LIST_DETAIL, getListDetail),
        yield takeLatest(LIST_TYPE.GET_MOVIE_BELONG_LIST, getMovieBelongList), 
        yield takeLatest(LIST_TYPE.CLEAR_LIST, clearList),
        yield takeLatest(MOVIE_TYPE.REMOVE_MOVIE_FROM_FAVORITE, removeMovieFromFavorite),
        yield takeLatest(MOVIE_TYPE.REMOVE_MOVIE_FROM_WATCHLIST, removeMovieFromWatchlist),
        yield takeLatest(MOVIE_TYPE.RATE_MOVIE, rateMovie),
        yield takeLatest(MOVIE_TYPE.DELETE_RATE, deleteRating),
        yield takeEvery(MOVIE_TYPE.CHECK_MOVIE_BELONGS_TO_LIST, checkMovieBelongsToList),
        yield takeEvery(MOVIE_TYPE.ADD_MOVIE_TO_WATCH_LIST, addWatchlistDebug),
        yield takeLatest(LIST_TYPE.GET_MOVIE_LIST_FOR_POPUP, getMovieListForPopup),
    ])
}

export default saga;

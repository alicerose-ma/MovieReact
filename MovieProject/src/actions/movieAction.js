import {
    MOVIE_ACTION
} from '../actions/types'

export const getLatestMovieSuccess = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_LATEST_SUCCESS,
        payload: resFormat
    }
}

export const getLatestMovieFail = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_LATEST_FAIL,
        payload: resFormat
    }
 }


 export const getPlayingMovieSuccess = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_PLAYING_SUCCESS,
        payload: resFormat
    }
}

export const getPlayingMovieFail = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_PLAYING_FAIL,
        payload: resFormat
    }
 }


 export const getUpcomingMovieSuccess = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_UPCOMING_SUCCESS,
        payload: resFormat
    }
}

export const getUpcomingMovieFail = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_UPCOMING_FAIL,
        payload: resFormat
    }
 }

 export const getTopRatedMovieSuccess = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_TOP_RATED_SUCCESS,
        payload: resFormat
    }
}

export const getTopRatedMovieFail = (resFormat) => {
    return {
        type: MOVIE_ACTION.GET_TOP_RATED_FAIL,
        payload: resFormat
    }
 }


export const renderFavorite = (isRendered) => {
    return {
        type: MOVIE_ACTION.RENDER_FAVORITE,
        payload: {isRendered: isRendered} 
    }
 }

 export const renderWatchlist = (isRendered) => {
     console.log("ACTION");
    return {
        type: MOVIE_ACTION.RENDER_WATCH_LIST,
        payload: {isRendered: isRendered} 
    }
 }

 export const renderList = (isRendered) => {
    return {
        type: MOVIE_ACTION.RENDER_LIST,
        payload: {isRendered: isRendered} 
    }
 }

 export const renderListDetail= (isRendered) => {
    return {
        type: MOVIE_ACTION.RENDER_LIST_DETAIL,
        payload: {isRendered: isRendered} 
    }
 }


 export const renderRate= (isRendered) => {
    return {
        type: MOVIE_ACTION.RENDER_RATE,
        payload: {isRendered: isRendered} 
    }
 }




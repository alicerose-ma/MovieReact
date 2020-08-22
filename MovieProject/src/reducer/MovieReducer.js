import { MOVIE_ACTION } from '../actions/types'

const INITIAL_STATE = {
    latestMovie: {},
    playingMovies: {},
    upcomingMovies: {},
    topRatedMovies: {},
    renderFavorite: undefined,
    renderWatchlist: undefined,
    renderList: undefined,
    renderListDetail: undefined,
    renderRate: false,
}

export default MovieReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVIE_ACTION.GET_LATEST_SUCCESS:
            return { ...state, latestMovie: action.payload.data }
        case MOVIE_ACTION.GET_LATEST_FAIL:
            console.log("PAYLOAD", action.payload)
            return { ...state, latestMovie: action.payload.data }
        case MOVIE_ACTION.GET_PLAYING_SUCCESS:
            return { ...state, playingMovies: action.payload.data }
        case MOVIE_ACTION.GET_PLAYING_FAIL:
            return { ...state, playingMovies: action.payload }
        case MOVIE_ACTION.GET_UPCOMING_SUCCESS:
            return { ...state, upcomingMovies: action.payload.data }
        case MOVIE_ACTION.GET_UPCOMING_FAIL:
            return { ...state, upcomingMovies: action.payload }
        case MOVIE_ACTION.GET_TOP_RATED_SUCCESS:
            return { ...state, topRatedMovies: action.payload.data }
        case MOVIE_ACTION.GET_TOP_RATED_FAIL:
            return { ...state, topRatedMovies: action.payload }



        case MOVIE_ACTION.RENDER_FAVORITE:
            return { ...state, renderFavorite: action.payload.isRendered }
        case MOVIE_ACTION.RENDER_WATCH_LIST:
            console.log("[REDUCER]");
            return { ...state, renderWatchlist: action.payload.isRendered }
        case MOVIE_ACTION.RENDER_LIST:
            return { ...state, renderList: action.payload.isRendered }
        case MOVIE_ACTION.RENDER_LIST_DETAIL:
            return { ...state, renderListDetail: action.payload.isRendered }
            case MOVIE_ACTION.RENDER_RATE:
                return { ...state, renderRate: action.payload.isRendered }
        default:
            return state;
    }
};

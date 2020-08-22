// export const AUTH_TYPE = { 
// }

export const MOVIE_TYPE = {
    GET_LATEST: 'get_latest_movie',
    GET_PLAYING: 'get_playing_movie',
    GET_UPCOMING: 'get_upcoming_movie',
    GET_POPULAR: 'get_popular_movie',
    GET_TOP_RATED: 'get_top_rated_movie',
    GET_MOVIE_DETAIL: 'get_movie_detail',
    GET_TRAILER: 'get_trailer',
    SEARCH: 'search_movie',
    FAVORITE_MOVIE: 'favorite_movie',
    WATCH_LIST_MOVIE: 'watch_list_movie',
    MOVIE_STATE: "get_movie_state",
    MARK_AS_FAVORITE: 'toggle_movie_favorite_state',
    MARK_AS_WATCH_LIST: 'toggle_movie_watch_list_state',

    GET_MOVIE_CREDIT: 'get_movie_credit',
    REMOVE_MOVIE_FROM_FAVORITE:  'remove_movie_from_favorite',
    REMOVE_MOVIE_FROM_WATCHLIST:  'remove_movie_from_watchlist',
    RATE_MOVIE: 'rate_movie',
    DELETE_RATE: 'delete_rate_movie',
    CHECK_MOVIE_BELONGS_TO_LIST: 'check_movie_belongs_to_list',
    ADD_MOVIE_TO_WATCH_LIST: 'add_movie_to_watchlist',
    
} 


export const ROOT_TYPE = {
    START_LOADING: 'start_loading',
    STOP_LOADING:'stop_loading',
    GET_LANGUAGE_LIST: 'get_language_list',
    NETWORK_TOGGLE: 'toggle_network',
    CREATE_SESSION_ID: 'create_session_id',
    DELETE_SESSION_ID: 'delete_session_id',
    UPDATE_ACCOUNT_DETAIL: 'update_account_detail'
}

export const ACCOUNT_TYPE = {
    LOGIN: 'login',
    LOGOUT:'logout',
    GET_ACCOUNT_DETAIL: 'get_account_detail',
    
} 

export const LIST_TYPE = {
    GET_MOVIE_LIST: 'get_movie_list',
    CREATE_NEW_LIST: 'create_new_list',
    DELETE_LIST: 'delete_list',
    ADD_MOVIE_TO_LIST: 'add_movie_to_list',
    REMOVE_MOVIE_TO_LIST: 'remove_movie_from_list',
    GET_LIST_DETAIL: 'get_list_detail',
    GET_MOVIE_BELONG_LIST: 'get_movie_belong_list',
    CLEAR_LIST: 'clear_list',
    GET_MOVIE_LIST_FOR_POPUP: 'get_movie_list_for_popup',
}




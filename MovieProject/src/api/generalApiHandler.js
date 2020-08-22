import movieDB from './movieDB'
const API_KEY = 'api_key=c6daf34c1130b89e1e7821159af5b818'
// c6daf34c1130b89e1e7821159af5b818
export const getApi = (path, params) => () => {
    return movieDB.get(`${path}${API_KEY}`, {
        params: params
    })
}

export const getApiWithQuery = (path, optionalQuery) => () => {
    // console.log("full URL", `${path}${API_KEY}${optionalQuery}`);
    return movieDB.get(`${path}${API_KEY}${optionalQuery}`)
}

// export const getApiWithQuery = (path, params) => () => {
//     return movieDB.get(`${path}${API_KEY}&query=${encodeURIComponent(params)}`)
// }

export const getApiWithSessionId = (path, session_id, optionalQuery) => () => {
    if(optionalQuery) {
        // console.log('GET LONG URL 1',`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`);
        return movieDB.get(`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`)
    } else {
        // console.log('GET SHORT URL 2',`${path}${API_KEY}&session_id=${session_id}`);
        return movieDB.get(`${path}${API_KEY}&session_id=${session_id}`)

    }
    
}

export const postApi = (path, params) => () => {
    return movieDB.post(`${path}${API_KEY}`, params)
}

export const postApiWithSessionId = (path, session_id, optionalQuery, params) => () => {
    // console.log('FULL URL',`${path}${API_KEY}&session_id=${session_id}`);
    // return movieDB.post(`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`, params)
    if(optionalQuery) {
        // console.log(' POST LONG URL 1',`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`);
        return movieDB.post(`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`, params)
    } else {
        // console.log('POST SHORT URL 2',`${path}${API_KEY}&session_id=${session_id}`, params);
        return movieDB.post(`${path}${API_KEY}&session_id=${session_id}`, params)

    }
}

export const deleteApi = (path, params) => () => {
    console.log("DELETE", params)
    return movieDB.delete(`${path}${API_KEY}`, { params: params })
}

export const deleteApiWithSessionId = (path, session_id, optionalQuery, params) => () => {
    if(optionalQuery) {
        // console.log('FULL URL 1',`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`,  params);
        return movieDB.delete(`${path}${API_KEY}&session_id=${session_id}${optionalQuery}`, params)
    } else {
        // console.log('FULL URL 2',`${path}${API_KEY}&session_id=${session_id}`, params);
        return movieDB.delete(`${path}${API_KEY}&session_id=${session_id}`, params)

    }
}

// await movieDB.post(`${apiName}${API_KEY}`, params)
        // console.log("AAAA")

        //
    // }
    // export const processAPI = async (apiName, method, params, callBack) => {
    // switch (method) {
    //     case 'get':
            // return () => console.log('aaaaaa')

        // case 'post':
        //     try {
        //         return await movieDB.post(`${apiName}${API_KEY}`, params)
        //     }
        //     catch (err_1) {
        //         return err_1
        //     }
        // case 'delete':
        //     try {
        //         return await movieDB.delete(`${apiName}${API_KEY}`, { params: params })
        //     }
        //     catch (err_2) {
        //         return err_2
        //     }
        // default:
        //     console.log('default')
        //     return null
    // }
// }
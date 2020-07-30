import movieDB from './movieDB'
import { API_KEY } from './movieDB'

export const processAPI = async (apiName, method, params, callBack) => {
    switch (method) {
        case 'get':
            try {
                const res = await movieDB.get(`${apiName}${API_KEY}`, {
                    params: params
                })
                return callBack && callBack(successResponse(apiName, res))
            }
            catch (err) {
                return callBack && callBack(failResponse(apiName, err))
            }
        case 'post':
            try {
                const res_1 = await movieDB.post(`${apiName}${API_KEY}`, params)
                return callBack && callBack(successResponse(apiName, res_1))
            }
            catch (err_1) {
                return callBack && callBack(failResponse(apiName, err_1))
            } 
        case 'delete':
            try {
                const res_2 = await movieDB.delete(`${apiName}${API_KEY}`, { params: params })
                return callBack && callBack(successResponse(apiName, res_2))
            }
            catch (err_2) {
                return callBack && callBack(failResponse(apiName, err_2))
            } 
        default:
            console.log('default')
            return null
    }
}

export const successResponse = (apiName, response) => {
    return {
        "apiName": apiName,
        "success": response.data.success,
        "status": response.status,
        "errMessage": response.status_message || '',
        "data": response.data,
    }
}

export const failResponse = (apiName, err) => {
    return {
        "apiName": apiName,
        "success": err.response.data.success || false,
        "status": err.response.status,
        "errMessage": err.response.data.status_message || 'Default Error Not Found',
    }
}



// switch (method) {
//     case 'get':
//         return movieDB.get(`${apiName}${API_KEY}`, {
//             params: params
//         }).then(res => {
//             callBack && callBack(successResponse(apiName, res))
//         })
//         .catch(err => {
//             callBack && callBack(failResponse(apiName, err))
//         })
//     case 'post':
//         return movieDB.post(`${apiName}${API_KEY}`, params ).then(res => {
//             callBack && callBack(successResponse(apiName, res))
//         })
//         .catch(err => {
//             callBack && callBack(failResponse(apiName, err))
//         }) 
//     case 'delete':

//         return movieDB.delete(`${apiName}${API_KEY}`, {params: params}).then(res => {
//             callBack && callBack(successResponse(apiName, res))
//         })
//         .catch(err => {
//             callBack && callBack(failResponse(apiName, err))
//         }) 
//     default:
//         console.log('default')
//         return null
// }
import movieDB from './movieDB'
import { API_KEY } from './movieDB'

export const callSagaAPI = (apiName, method, params) => {
    switch (method) {
        case 'get':
            return () => movieDB.get(`${apiName}${API_KEY}`, {params: params })
        case 'post':
                return () => movieDB.post(`${apiName}${API_KEY}`, params)
        case 'delete':
            return () => movieDB.delete(`${apiName}${API_KEY}`, {params: params })
        default:
            console.log('default')
            return () => {}
    }
}

export const successResponse = (apiName, response) => {
    return {
        "apiName": apiName,
        "success": response.data.success || false,
        "status": response.status,
        "errMessage": response.data.status_message || '',
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


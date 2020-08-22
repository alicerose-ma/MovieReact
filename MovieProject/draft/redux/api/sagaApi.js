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



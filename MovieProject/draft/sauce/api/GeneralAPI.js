import getClient from './index'

export default class GeneralAPI {
  GETApi = (url, params = {} ) => {
    const client = getClient();
    return client.get(url, params)
  } 
  
}
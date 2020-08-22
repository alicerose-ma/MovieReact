import GeneralApi from './GeneralAPI'
import { APIPath } from './ApiPath'
import GeneralAPI from './GeneralAPI'

class Authentication extends GeneralAPI {

    getToken = () => {
        let url = APIPath.TOKEN_AUTH_LOGIN
        return {
            send: () => this.GETApi(url)
        }
    }
}

const authInstance = new Authentication();
export default authInstance;

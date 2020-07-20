import axios from 'axios'

export const API_KEY= 'api_key=c6daf34c1130b89e1e7821159af5b818'

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmRhZjM0YzExMzBiODllMWU3ODIxMTU5YWY1YjgxOCIsInN1YiI6IjVlY2ExM2Q5ZDIxNDdjMDAyM2MzMzc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mFHksk9vvO4-pVzDqxWx_IEhCnJmLu-0GakzkE7w-s4'
    }
})

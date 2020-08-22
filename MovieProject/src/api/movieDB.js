import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    // Authorization:
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmRhZjM0YzExMzBiODllMWU3ODIxMTU5YWY1YjgxOCIsInN1YiI6IjVlY2ExM2Q5ZDIxNDdjMDAyM2MzMzc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mFHksk9vvO4-pVzDqxWx_IEhCnJmLu-0GakzkE7w-s4'
    }
})
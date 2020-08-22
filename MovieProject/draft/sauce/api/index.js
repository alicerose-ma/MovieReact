import apisauce from 'apisauce';

var client = apisauce.create({
    baseURL: 'https://api.themoviedb.org/3',
});

const getClient = () => {
    return client
}

export default getClient
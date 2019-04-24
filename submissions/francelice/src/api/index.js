import axios from 'axios';
const BASE_URL = 'http://localhost:3000/';
const SITHS_ENDPOINT = 'dark-jedis/';
const CancelToken = axios.CancelToken;

export const getSith = id => {
    const source = CancelToken.source();

    const promise = axios.request({
        method: 'get',
        url: `${BASE_URL}${SITHS_ENDPOINT}${id}`,
        cancelToken: source.token
    }).then(r => r.data);

    const cancel = () => source.cancel('Op cancelled by the user');

    return {promise, cancel};
}

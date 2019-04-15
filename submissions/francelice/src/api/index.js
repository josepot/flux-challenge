import axios from 'axios';
const BASE_URL = 'http://localhost:3000/';
const SITHS_ENDPOINT = 'dark-jedis/';

//export const getSith = (id) => fetch(`${BASE_URL}${SITHS_ENDPOINT}${id}`)
export const getSith = (id) => {
    return axios.request({
        method: 'get',
        url: `${BASE_URL}${SITHS_ENDPOINT}${id}`
      });
}

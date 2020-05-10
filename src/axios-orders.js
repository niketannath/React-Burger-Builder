import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://the-burger-builder-fee33.firebaseio.com/'
});

export default instance;
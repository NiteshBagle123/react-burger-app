import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-1612e.firebaseio.com/'
});

export default instance;
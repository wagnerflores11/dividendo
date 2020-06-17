import axios from 'axios';


const backend = axios.create({
    baseURL: 'http://localhost:3333'
});

export default backend;
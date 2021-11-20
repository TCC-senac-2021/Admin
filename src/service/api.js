import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://converta-solution.herokuapp.com'
});

export default Api;
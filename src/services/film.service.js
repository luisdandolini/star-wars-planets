import axios from 'axios';
                                                                                     
const api = axios.create({
  baseURL:'https://swapi.dev/api'
});

const filmService = {};

filmService.getFilms = () => {
  return api.get('/films');
};

export default filmService;
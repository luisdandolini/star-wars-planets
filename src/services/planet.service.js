import axios from "axios";

const api = axios.create({
  baseURL:'https://swapi.dev/api'
});

const planetService = {};

planetService.getPlanet = (id) => {
  return api.get(`/planets/${id}`);
};

export default planetService;
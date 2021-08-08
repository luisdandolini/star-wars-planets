import React, { useState, useEffect } from 'react'
import filmService from './services/film.service'
import planetService from './services/planet.service'
import { format } from 'date-fns'
import './index.css'

function App() {
  const [films, setFilms] = useState([])
  const [planets, setPlanets] = useState([])

  const [selectedFilm, setSelectedFilm] = useState(undefined)

  function formatDate(dateString) {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }

  useEffect(() => {
    async function loadFilms() {
      const response = await filmService.getFilms()
      const films = response.data.results
      films.forEach(film => (film.release_date = formatDate(film.release_date)))

      setFilms(films)
    }

    loadFilms()
  }, [])

  async function loadPlanet(id) {
    const response = await planetService.getPlanet(id)
    const planet = response.data
    console.log(planet)
    setPlanets(planets => [...planets, planet])
  }

  function handleFilmClick(data) {
    // seleciona o filme clicado
    setSelectedFilm(data)

    setPlanets([])
    const planetIds = data.planets.map(
      //  quebra o endpoint do planeta com base nas "/"
      // o id do planeta está na penúltima posição do array
      planet => planet.split('/').slice(-2, -1)[0]
    )
    console.log(planetIds)
    const planets = []
    planetIds.forEach(id => {
      //planets.push(loadPlanet(planet))
      loadPlanet(id)
    })
    //setPlanets(planets)
  }

  function handleClearClick() {
    setSelectedFilm(undefined)
    setPlanets([])
  }

  function Films() {
    return (
      <div>
        {films.map(film => (
          <div key={film.episode_id} className="list-item">
            <Film film={film} />
            {selectedFilm === film ? <Planets /> : <></>}
          </div>
        ))}
      </div>
    )
  }

  function Film(props) {
    return (
      <div onClick={() => handleFilmClick(props.film)} className="film">
        <h1>{props.film.title}</h1>
        <h2>{props.film.director}</h2>
        <h3>{props.film.release_date}</h3>
      </div>
    )
  }

  function Planets() {
    return (
      <div>
        {planets.map((planet, index) => (
          <div key={index}>
            <Planet planet={planet} />
          </div>
        ))}
        <button onClick={() => handleClearClick()}>CLEAR</button>
      </div>
    )
  }

  function Planet(props) {
    return (
      <div>
        <h2>{props.planet.name}</h2>
        <h2>{props.planet.population}</h2>
      </div>
    )
  }

  return (
    <div id="app">
      <Films />
    </div>
  )
}

export default App

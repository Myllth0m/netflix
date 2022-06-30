import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import './Home.scss'

const apiKey = 'f080850117e6c6c1df95cc119bb5c36b'
const urlBase = 'https://api.themoviedb.org/3'
const imageUrl = 'https://image.tmdb.org/t/p/original'

const upcoming = 'upcoming'
const nowPlaying = 'now_playing'
const popular = 'popular'
const topRated = 'top_rated'


const Card = ({ image }) => (
  <img className='card' src={image} alt='cover' />
)

const Row = ({ title, array = [] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {array.map(item => (
        <Card key={item.id} image={`${imageUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
)

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [genresMovies, setGenresMovies] = useState([])

  useEffect(() => {
    const fetchUpcoming = async () => {
      let { data: { results } } = await axios.get(`${urlBase}/movie/${upcoming}?api_key=${apiKey}`)
      setUpcomingMovies(results)
    }

    const fetchNowPlaying = async () => {
      let { data: { results } } = await axios.get(`${urlBase}/movie/${nowPlaying}?api_key=${apiKey}`)
      setNowPlayingMovies(results)
    }

    const fetchPopular = async () => {
      let { data: { results } } = await axios.get(`${urlBase}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(results)
    }

    const fetchTopRated = async () => {
      let { data: { results } } = await axios.get(`${urlBase}/movie/${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(results)
    }

    const fetchGenres = async () => {
      let { data: { genres } } = await axios.get(`${urlBase}/genre/movie/list?api_key=${apiKey}`)
      setGenresMovies(genres)
    }

    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
    fetchGenres()
  }, [])

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0]
          ? `url(${imageUrl}/${popularMovies[0].poster_path})`
          : 'rgb(16, 16, 16)'
      }}>
        { popularMovies[0] && (<h1>{popularMovies[0].original_title}</h1>) }
        { popularMovies[0] && (<p>{popularMovies[0].overview}</p>) }

        <div>
          <button><BiPlay /> Play</button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>
      <Row title={'Upcoming Movies'} array={upcomingMovies} />
      <Row title={'Now Playing Movies'} array={nowPlayingMovies} />
      <Row title={'Popular Movies'} array={popularMovies} />
      <Row title={'Top Rated Movies'} array={topRatedMovies} />
      <div className="genre-box">
        {genresMovies.map(item => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Home
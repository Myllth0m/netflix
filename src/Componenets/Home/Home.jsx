import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import './Home.scss'

const Card = ({ image }) => (
  <img className='card' src={image} alt='cover' />
)

const Row = ({ title, array = [] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {array.map(item => (
        <Card key={item.id} image={`${process.env.REACT_APP_IMAGE_URL}/${item.poster_path}`} />
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
      let { data: { results } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`)
      setUpcomingMovies(results)
    }

    const fetchNowPlaying = async () => {
      let { data: { results } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
      setNowPlayingMovies(results)
    }

    const fetchPopular = async () => {
      let { data: { results } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
      setPopularMovies(results)
    }

    const fetchTopRated = async () => {
      let { data: { results } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
      setTopRatedMovies(results)
    }

    const fetchGenres = async () => {
      let { data: { genres } } = await axios.get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
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
          ? `url(${process.env.REACT_APP_IMAGE_URL}/${popularMovies[0].poster_path})`
          : 'rgb(16, 16, 16)'
      }}>
        { popularMovies[0] && (<h1>{popularMovies[0].original_title}</h1>) }
        { popularMovies[0] && (<p>{popularMovies[0].overview}</p>) }

        <div>
          <button><BiPlay /> Play</button>
          <button><AiOutlinePlus /> My List</button>
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
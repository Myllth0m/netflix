import React from 'react'
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'
import logo from '../../logo.png'

const Header = () => {
  return (
    <nav className='header'>
      <img src={logo} alt='logo' />
      <div>
        <Link to='/tvshows'>TV Shows</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/recentlyAdded'>Recently Added</Link>
        <Link to='/myList'>My List</Link>
      </div>
      <ImSearch />
    </nav>
  )
}

export default Header
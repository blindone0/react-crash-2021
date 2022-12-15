import React from 'react'
import { Link } from 'react-router-dom'
import Stars from './Stars'

const Footer = () => {
  return (
    <footer>
      <p>blind0ne &copy; 2022</p>
      <Link to='/about'>About</Link>
      <Stars/>
    </footer>
  )
}

export default Footer

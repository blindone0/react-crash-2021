import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import { ReactComponent as Telegram } from '../imgs/Telegram_logo.svg';
import { ReactComponent as TikTok } from '../imgs/TikTok-Logo.wine.svg';
import { ReactComponent as YouTube } from '../imgs/YouTube-Logo.wine.svg';

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1 className='logo'>{title}</h1>


      {/* {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'black'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )} */}
    </header>
  )
}

Header.defaultProps = {
  title: 'Shooting Stars Garden',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header

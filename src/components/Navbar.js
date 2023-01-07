import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav role="navigation">
            <ul>
              <li><a href="#"></a></li>
              <li><a href="#"></a>
                <ul className="dropdown orbit">
                  <li><a href="#"></a></li>
                </ul>
              </li>
            </ul>
          </nav>
    </>
  )
}

export default Navbar
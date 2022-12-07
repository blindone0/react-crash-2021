import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav role="navigation">
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Magic</a>
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
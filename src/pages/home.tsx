import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const Home = (): ReactElement => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/table">Table</Link>
        </li>
        <li>
          <Link to="/trello">Mini Trello</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home

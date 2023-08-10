import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <>

      <h1>Notesolvers</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create note</Link>
          </li>
          <li>
            <Link to="/edit/4">Edit note</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adduser">Add User</Link></li>
            <li><Link to="/userdetails">User Details</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav

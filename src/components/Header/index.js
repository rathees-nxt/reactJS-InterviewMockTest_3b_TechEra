import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Link to="/">
          <img
            className="website-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
    )
  }
}

export default Header

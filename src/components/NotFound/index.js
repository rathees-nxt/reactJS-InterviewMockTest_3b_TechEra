import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <Header />
    <div className="notfound-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-para">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound

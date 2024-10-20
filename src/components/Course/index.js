import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <Link to={`courses/${id}`} className="nav-link">
      <li className="course-item-container">
        <div className="course-content">
          <img className="logo-img" src={logoUrl} alt={name} />
          <p className="logo-heading">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default Course

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/te/courses')
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseListView = () => {
    const {courseList} = this.state
    return (
      <div className="course-container">
        <h1 className="heading">Courses</h1>
        <ul className="course-list-container">
          {courseList.map(item => (
            <Course key={item.id} courseDetails={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" onClick={this.getCourseList} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default Home

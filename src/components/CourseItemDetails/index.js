import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      console.log(updatedData)
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseItemView = () => {
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails
    return (
      <div className="course-details-container">
        <div className="course-details">
          <img className="course-img" src={imageUrl} alt={name} />
          <div className="course-contents">
            <h1 className="course-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
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
      <button
        className="retry-btn"
        onClick={this.getCourseDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemView()
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
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default CourseItemDetails

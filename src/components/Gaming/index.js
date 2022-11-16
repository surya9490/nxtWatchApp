import {Component} from 'react'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../SideBar'

import {
  Container,
  SideAndTrendContainer,
  TrendIconContainer,
  TrendingContainer,
  GamingList,
  GamingItem,
  GamingImage,
  GamingDetails,
} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, fetchedData: []}

  componentDidMount() {
    this.gamingVideosApiUrl()
  }

  gamingVideosApiUrl = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        thumbnailUrl: eachVideo.thumbnail_url,
      }))

      this.setState({
        fetchedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchResults = () => {
    this.gamingVideosApiUrl()
  }

  renderSuccessApiRequest = () => {
    const {fetchedData} = this.state

    return (
      <GamingList>
        {fetchedData.map(eachVideo => (
          <Link to={`/videos/${eachVideo.id}`} style={{textDecoration: 'none'}}>
            <GamingItem key={eachVideo.id}>
              <GamingImage src={eachVideo.thumbnailUrl} alt="video thumbnai" />
              <GamingDetails size="14px">{eachVideo.title}</GamingDetails>
              <GamingDetails size="10px">
                {eachVideo.viewCount} Watching World Wide
              </GamingDetails>
            </GamingItem>
          </Link>
        ))}
      </GamingList>
    )
  }

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div>
            {isDark ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                alt="failure view"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure view"
              />
            )}
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={this.renderSearchResults}>
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessApiRequest()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <SideAndTrendContainer>
          <Sidebar />
          <NxtWatchContext.Consumer>
            {value => {
              const {backgroundTheme, isDark} = value
              const iconResult =
                backgroundTheme === 'black' ? '#231f20' : '#f1f1f1'
              const result = isDark ? 'white' : 'black'
              const bgResult = isDark ? 'black' : 'white'
              return (
                <TrendingContainer color={result} bgColor={bgResult}>
                  <TrendIconContainer bgColor={iconResult}>
                    <SiYoutubegaming />
                    <Link to="/gaming">
                      <h1>Gaming</h1>
                    </Link>
                  </TrendIconContainer>

                  {this.renderApiStatus()}
                </TrendingContainer>
              )
            }}
          </NxtWatchContext.Consumer>
        </SideAndTrendContainer>
      </Container>
    )
  }
}

export default Gaming

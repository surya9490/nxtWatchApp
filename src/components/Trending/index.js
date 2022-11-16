import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiTrendingDown} from 'react-icons/bi'
import Header from '../Header'
import Sidebar from '../SideBar'

import {
  Container,
  SideAndTrendContainer,
  TrendingContainer,
  TrendingIconContainer,
  TrendingEachItemContainer,
} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'
import TrendingItems from '../TrendingItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.initial, fechedData: []}

  componentDidMount() {
    this.trendingVideosApiUrl()
  }

  trendingVideosApiUrl = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: eachVideo.published_at,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        thumbnailUrl: eachVideo.thumbnail_url,

        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
      }))

      this.setState({
        fechedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessApiRequest = () => {
    const {fechedData} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const bgResult = isDark ? '#181818' : 'white'
          const colorResult = isDark ? 'white' : 'black'

          return (
            <TrendingEachItemContainer bgColor={bgResult}>
              {fechedData.map(eachVideo => (
                <TrendingItems
                  key={eachVideo.id}
                  eachVideo={eachVideo}
                  colorResult={colorResult}
                />
              ))}
            </TrendingEachItemContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderSearchResults = () => {
    this.trendingVideosApiUrl()
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
      <NxtWatchContext.Consumer>
        {value => {
          const {backgroundTheme, isDark} = value
          const iconResult = backgroundTheme === 'black' ? '#231f20' : '#f1f1f1'
          const result = isDark ? 'white' : 'black'

          return (
            <Container color={result}>
              <Header />
              <SideAndTrendContainer>
                <Sidebar />
                <TrendingContainer>
                  <TrendingIconContainer bgColor={iconResult}>
                    <BiTrendingDown />
                    <Link to="/trending">Trending</Link>
                  </TrendingIconContainer>
                  {this.renderApiStatus()}
                </TrendingContainer>
              </SideAndTrendContainer>
            </Container>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending

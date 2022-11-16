import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItems'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  Container,
  HomeContainer,
  LogoImage,
  BannerContainer,
  BannerInfo,
  BannerButton,
  BannerImage,
  VideosContainer,
  UnorderedVideos,
  SearchResultsContainer,
  RetryImage,
  ApiResultsContainer,
  Input,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    search: '',
    apiStatus: apiStatusConstants.initial,
    userInput: '',
    fetchData: [],
    banner: 'flex',
  }

  componentDidMount() {
    this.homeVideosApiUr()
  }

  homeVideosApiUr = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {search} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
        fetchData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeUserSearch = event => {
    this.setState({userInput: event.target.value})
  }

  renderSearchResults = () => {
    const {userInput} = this.state
    this.setState({search: userInput}, this.homeVideosApiUr)
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retrySearchResults = () => {
    this.homeVideosApiUr()
  }

  removeBanner = () => {
    this.setState({banner: 'none'})
  }

  renderSuccessApiRequest = () => {
    const {fetchData, userInput} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const result = isDark ? 'white' : 'black'
          const color = isDark ? '#181818' : '#f9f9f9'
          return (
            <SearchResultsContainer>
              <Input
                color={`1px solid ${color}`}
                data-testid="home"
                type="search"
                onChange={this.onChangeUserSearch}
                placeholder="Search"
                value={userInput}
              />
              <button
                type="button"
                onClick={this.renderSearchResults}
                data-testid="searchButton"
              >
                <AiOutlineSearch />
              </button>

              {fetchData.length !== 0 ? (
                <UnorderedVideos>
                  {fetchData.map(eachItem => (
                    <VideoItem
                      key={eachItem.id}
                      eachItem={eachItem}
                      result={result}
                    />
                  ))}
                </UnorderedVideos>
              ) : (
                <div>
                  <RetryImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <h1>No Search results found</h1>
                  <p>Try different key words or remove search filter</p>
                  <button type="button" onClick={this.retrySearchResults}>
                    Retry
                  </button>
                </div>
              )}
            </SearchResultsContainer>
          )
        }}
      </NxtWatchContext.Consumer>
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
    const {banner} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <Container>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDark, backgroundTheme, color} = value
            const bgUrl =
              'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png '
            const bgResult = isDark ? 'black' : '#e2e8f0'
            return (
              <HomeContainer>
                <SideBar />
                <ApiResultsContainer bgColor={backgroundTheme}>
                  <BannerContainer display={banner}>
                    <div>
                      <LogoImage
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />

                      <BannerInfo>Buy Nxt Watch Premium</BannerInfo>
                      <button type="button">GET IT NOW</button>
                    </div>
                    <BannerImage imgUrl={bgUrl} data-testid="banner">
                      <BannerButton
                        data-testid="close"
                        type="button"
                        onClick={this.removeBanner}
                      >
                        <AiOutlineClose />
                      </BannerButton>
                    </BannerImage>
                  </BannerContainer>
                  <VideosContainer bgColor={bgResult}>
                    {this.renderApiStatus()}
                  </VideosContainer>
                </ApiResultsContainer>
              </HomeContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      </Container>
    )
  }
}

export default Home

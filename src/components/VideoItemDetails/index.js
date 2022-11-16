import {Component, React} from 'react'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {GiSaveArrow} from 'react-icons/gi'
import Header from '../Header'
import Sidebar from '../SideBar'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  Container,
  SideAndTrendContainer,
  TrendingContainer,
  Buttons,
  LikeInfo,
  DislikeInfo,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    fetchedData: [],
    apiStatus: apiStatusConstants.initial,
    likeColor: false,
    dislike: false,
  }

  componentDidMount() {
    this.videoDetailsApiUrl()
  }

  onClickLikeButton = () => {
    const {dislike} = this.state
    if (dislike === true) {
      this.setState({likeColor: true, dislike: false})
    } else {
      this.setState(prevState => ({likeColor: !prevState.likeColor}))
    }
  }

  onClickDislikeButton = () => {
    const {likeColor} = this.state
    if (likeColor === true) {
      this.setState({dislike: true, likeColor: false})
    } else {
      this.setState(prevState => ({dislike: !prevState.dislike}))
    }
  }

  videoDetailsApiUrl = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        thumbnailUrl: data.video_details.thumbnail_url,
        description: data.video_details.description,
        videoUrl: data.video_details.video_url,

        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
      }
      this.setState({
        fetchedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSearchResults = () => {
    this.videoDetailsApiUrl()
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

  renderSuccessApiRequest = () => {
    const {fetchedData, likeColor, dislike} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark, savedItems} = value
          const displayColor = isDark ? 'white' : 'black'
          const likeResult = likeColor ? '#2563eb' : '#64748b'
          const dislikeResult = dislike ? '#2563eb' : '#64748b'
          const bgColor = isDark ? 'black' : 'white'
          const onClickSaveButton = () => {
            savedItems({fetchedData})
          }
          const fromDate = formatDistanceToNow(
            new Date(fetchedData.publishedAt),
          )
          return (
            <div>
              <ReactPlayer
                title="youtube"
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              />
              <p>{fetchedData.title}</p>
              <div>
                <div>
                  <p>{fetchedData.viewCount}</p>
                  <p>{fromDate}</p>
                </div>
                <div>
                  <div>
                    <Buttons
                      bgColor={bgColor}
                      type="button"
                      style={{color: likeResult}}
                      onClick={this.onClickLikeButton}
                    >
                      <AiOutlineLike style={{color: likeResult}} />
                      Like
                    </Buttons>
                  </div>
                  <div>
                    <Buttons
                      bgColor={bgColor}
                      type="button"
                      onClick={this.onClickDislikeButton}
                      style={{color: dislikeResult}}
                    >
                      <AiOutlineDislike style={{color: dislikeResult}} />
                      Dislike
                    </Buttons>
                  </div>
                  <div>
                    <button type="button" onClick={onClickSaveButton}>
                      <GiSaveArrow />
                    </button>
                    <p>Save</p>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <img
                  src={fetchedData.channel.profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p>{fetchedData.channel.name}</p>
                  <p>{fetchedData.channel.subscriberCount}</p>
                  <p>{fetchedData.description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

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
          const iconResult = backgroundTheme === 'black' ? 'black' : '#f1f1f1'
          const result = isDark ? 'white' : 'black'

          return (
            <Container color={result}>
              <Header />
              <SideAndTrendContainer>
                <Sidebar />
                <TrendingContainer bgColor={iconResult}>
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

export default VideoItemDetails

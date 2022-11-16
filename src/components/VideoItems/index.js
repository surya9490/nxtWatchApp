import {Link} from 'react-router-dom'
import {
  VideoEachItem,
  ChannelProfileImage,
  InfoContainer,
  VideoInfo,
  ThumbnailImage,
  CountContainer,
} from './styledComponents'

const VideoItem = props => {
  const {eachItem, result} = props
  const {id} = eachItem
  console.log(result)

  return (
    <Link to={`/videos/${id}`} style={{textDecoration: 'none'}}>
      <VideoEachItem color={result}>
        <ThumbnailImage src={eachItem.thumbnailUrl} alt="video thumbnail" />
        <InfoContainer>
          <ChannelProfileImage
            src={eachItem.channel.profileImageUrl}
            alt="channel logo"
          />
          <div>
            <div>
              <VideoInfo>{eachItem.title}</VideoInfo>
            </div>
            <div>
              <VideoInfo>{eachItem.channel.name}</VideoInfo>
            </div>
            <CountContainer>
              <VideoInfo>{eachItem.viewCount}</VideoInfo>
              <VideoInfo>{eachItem.publishedAt}</VideoInfo>
            </CountContainer>
          </div>
        </InfoContainer>
      </VideoEachItem>
    </Link>
  )
}

export default VideoItem

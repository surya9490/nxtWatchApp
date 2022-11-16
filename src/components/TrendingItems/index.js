import {Link} from 'react-router-dom'

import {
  TrendingItemContainer,
  TrendingInfoContainer,
  TrendingItemImage,
  TrendingInfo,
} from './styledComponents'

const TrendingItems = props => {
  const {eachVideo, ColorResult} = props
  const {id} = eachVideo

  return (
    <Link to={`/videos/${id}`} style={{color: ColorResult}}>
      <TrendingItemContainer>
        <TrendingItemImage src={eachVideo.thumbnailUrl} alt="trending imag" />
        <TrendingInfoContainer>
          <TrendingInfo>{eachVideo.title}</TrendingInfo>
          <TrendingInfo>{eachVideo.channel.name}</TrendingInfo>
          <div>
            <TrendingInfo>{eachVideo.publishedAt}</TrendingInfo>
            <TrendingInfo>{eachVideo.viewCount}</TrendingInfo>
          </div>
        </TrendingInfoContainer>
      </TrendingItemContainer>
    </Link>
  )
}

export default TrendingItems

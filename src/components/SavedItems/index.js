import {Link} from 'react-router-dom'

import {SavedImage, SavedItem, SavedDetails} from './styledComponents'

const SavedItems = props => {
  const {eachItem, result} = props
  console.log(eachItem)

  return (
    <Link
      to={`/videos/${eachItem.fetchedData.id}`}
      style={{textDecoration: 'none'}}
    >
      <SavedItem color={result}>
        <SavedImage
          src={eachItem.fetchedData.thumbnailUrl}
          alt="video thumbnail"
        />
        <div>
          <SavedDetails>{eachItem.fetchedData.description}</SavedDetails>
          <SavedDetails>{eachItem.fetchedData.channel.name}</SavedDetails>
          <div>
            <SavedDetails>{eachItem.fetchedData.viewCount}</SavedDetails>
            <SavedDetails>{eachItem.fetchedData.publishedAt}</SavedDetails>
          </div>
        </div>
      </SavedItem>
    </Link>
  )
}

export default SavedItems

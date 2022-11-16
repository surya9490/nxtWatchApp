import Header from '../Header'
import Sidebar from '../SideBar'
import SavedItems from '../SavedItems'

import {
  Container,
  SideAndTrendContainer,
  TrendingContainer,
  NoVideo,
  NoVideoImage,
} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {backgroundTheme, isDark, savedVideosList} = value
      const iconResult = backgroundTheme === 'black' ? '#231f20' : '#f1f1f1'
      const result = isDark ? 'white' : 'black'
      const bgResult = isDark ? 'black' : 'white'

      const savedVideoDetailsResponse = () => (
        <>
          {savedVideosList.map(eachItem => (
            <SavedItems
              key={eachItem.fetchedData.id}
              eachItem={eachItem}
              result={result}
            />
          ))}
        </>
      )

      const renderNoSavedItem = () => (
        <>
          <NoVideo>
            <NoVideoImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1>No saved videos found</h1>
            <p>You can save your videos while watching them</p>
          </NoVideo>
        </>
      )

      const displayItem =
        savedVideosList.length > 0
          ? savedVideoDetailsResponse()
          : renderNoSavedItem()

      return (
        <Container>
          <Header />
          <SideAndTrendContainer>
            <Sidebar />
            <TrendingContainer color={result} bgColor={bgResult}>
              {displayItem}
            </TrendingContainer>
          </SideAndTrendContainer>
        </Container>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos

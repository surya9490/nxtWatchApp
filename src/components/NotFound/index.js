import Header from '../Header'
import Sidebar from '../SideBar'

import {
  Container,
  SideAndTrendContainer,
  TrendingContainer,
} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {backgroundTheme, isDark} = value
      const iconResult = backgroundTheme === 'black' ? '#231f20' : '#f1f1f1'
      const result = isDark ? 'white' : 'black'
      const bgResult = isDark ? 'black' : 'white'
      return (
        <Container>
          <Header />
          <SideAndTrendContainer>
            <Sidebar />
            <TrendingContainer color={result} bgColor={bgResult}>
              {isDark ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                  alt="not found"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                  alt="not found"
                />
              )}
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found</p>
            </TrendingContainer>
          </SideAndTrendContainer>
        </Container>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound

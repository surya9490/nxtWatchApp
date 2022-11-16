import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NxtWatchContext from './context/NxtWatchContext'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    isDark: false,
    backgroundTheme: 'white',
    color: 'black',
    savedVideosList: [],
  }

  changeTheme = () => {
    const {backgroundTheme} = this.state

    const result = backgroundTheme === 'white' ? 'black' : 'white'
    const colorResult = result === 'white' ? 'black' : 'white'
    this.setState(prevState => ({
      isDark: !prevState.isDark,
      backgroundTheme: result,
      color: colorResult,
    }))
  }

  savedItems = selectedVideo => {
    console.log('saved')
    const {savedVideosList} = this.state
    const result = savedVideosList.some(
      each => each.fetchedData.id === selectedVideo.fetchedData.id,
    )
    if (result === false) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, selectedVideo],
      }))
    } else {
      const remove = savedVideosList.filter(
        each => each.fetchedData.id !== selectedVideo.fetchedData.id,
      )
      console.log(remove)
      this.setState({savedVideosList: [...remove]})
    }
  }

  render() {
    const {isDark, backgroundTheme, color, savedVideosList} = this.state

    return (
      <BrowserRouter>
        <NxtWatchContext.Provider
          value={{
            isDark,
            color,
            backgroundTheme,
            savedVideosList,
            changeTheme: this.changeTheme,
            savedItems: this.savedItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </NxtWatchContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App

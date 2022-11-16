import React from 'react'

const NxtWatchContext = React.createContext({
  isDark: false,
  backgroundTheme: 'white',
  color: 'black',
  savedVideosList: [],
  changeTheme: () => {},
  savedItems: () => {},
})

export default NxtWatchContext

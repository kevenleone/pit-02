import React from 'react'
import Routes from './routes'
import AppContextProvider from './AppContextProvider'

export default function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  )
}

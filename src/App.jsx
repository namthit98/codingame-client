import React, { Suspense, useState } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { ToastContainer } from 'react-toastify'

import GameView from './views/GameView/GameView';

import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import Loading from './components/Loading'

const store = configureStore()

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 200)

  if (isLoading) return <Loading />

  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          draggable
          pauseOnHover
          newestOnTop
          closeOnClick
        />
        {/* <Suspense fallback={<Loading />}> */}
          <GameView />
        {/* </Suspense> */}
      </Provider>
    </>
  )
}

export default App

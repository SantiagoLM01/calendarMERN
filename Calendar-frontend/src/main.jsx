import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import CalendarApp from './CalendarApp'
import './styles.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <HashRouter>

      <React.StrictMode>

        <CalendarApp />
      </React.StrictMode>

    </HashRouter>

  </Provider>

)

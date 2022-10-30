import './global.css'
import 'virtual:fonts.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { NotificationProvider } from './contexts/NotificationContext'
import Header from './components/Header'
import App from './components/App'

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
)

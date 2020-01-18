import React from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider } from 'features/intl'
import { Router } from '../router'

const AppView = () => {
  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  )
}

export const App = hot(AppView)
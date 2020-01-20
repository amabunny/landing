import React from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider, useIntlFakeLoading } from 'shared-features/intl'
import { AppLoader } from 'ui'
import { Router } from '../router'

const AppView = () => {
  const { intlFakeLoading } = useIntlFakeLoading()

  return (
    <IntlProvider
      loadingMessageNode={<AppLoader />}
      outerLoading={intlFakeLoading}
    >
      <Router />
    </IntlProvider>
  )
}

export const App = hot(AppView)

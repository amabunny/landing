import React from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useStore } from 'effector-react'
import { $language, $intl } from '../../model'

interface IProps {
  children: React.ReactNode
  outerLoading?: boolean
  loadingMessageNode?: React.ReactNode
  loadingErrorNode?: React.ReactNode
}

export const IntlProvider = ({
  children,
  outerLoading,
  loadingMessageNode = 'Loading intl...',
  loadingErrorNode = 'An error occured during intl load.'
}: IProps) => {
  const language = useStore($language)
  const { data, loading, error } = useStore($intl)

  if (outerLoading || loading || !language) {
    return (
      <>
        {loadingMessageNode}
      </>
    )
  }

  if (error) {
    return (
      <>
        {loadingErrorNode}
      </>
    )
  }

  return (
    <ReactIntlProvider
      locale={language}
      messages={data}
    >
      {children}
    </ReactIntlProvider>
  )
}

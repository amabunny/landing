import { useState, useEffect } from 'react'
import { getLocaleAndChangeLanguage, changeLanguage, loadDictionary } from '../model'

const FAKE_LOADING_TIME_MS = 1000

/** Increased loading duration flag to preserve interface glitches */
export const useIntlFakeLoading = () => {
  const [intlFakeLoading, setFakeLoading] = useState(true)

  useEffect(() => {
    getLocaleAndChangeLanguage()

    const changeLanguageSub = changeLanguage.watch(() => {
      setFakeLoading(true)
    })

    const loadDictionarySub = loadDictionary.finally.watch(() => {
      setTimeout(() => {
        setFakeLoading(false)
      }, FAKE_LOADING_TIME_MS)
    })

    return () => {
      changeLanguageSub.unsubscribe()
      loadDictionarySub.unsubscribe()
    }
  }, [])

  return { intlFakeLoading }
}

import { createEffect } from 'effector'
import getLocale from 'browser-locale'
import { ValidationError } from 'typed-contracts'
import { LocalStorageService } from 'services'
import { AvailableLocales } from 'types'
import { availableLocalesContract } from './contracts'

export const saveLanguageToLocalStorage = createEffect({
  handler (language: string) {
    LocalStorageService.saveLanguage(language)
  }
})

export const loadUserLanguage = createEffect({
  async handler (): Promise<AvailableLocales> {
    let locale: string = getLocale()
    const localStorageLanguage = LocalStorageService.loadLanguage()

    if (localStorageLanguage) {
      locale = localStorageLanguage
    }

    const validatedLocale = availableLocalesContract('browser language', locale)

    if (validatedLocale instanceof ValidationError) {
      return AvailableLocales.enUS
    }

    return validatedLocale
  }
})

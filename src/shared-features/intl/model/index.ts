import { createStore, forward, guard } from 'effector'
import { createLoadDataStore } from 'utils/factory/load-data'
import { IntlModel } from 'models/intl'
import { AvailableLocales } from 'types'
import { changeLanguage, init } from './events'
import { saveLanguageToLocalStorage, loadUserLanguage } from './effects'

const {
  $data: $intlData,
  $dataStore: $intl,
  loadData: loadDictionary
} = createLoadDataStore({
  loadDataHandler: IntlModel.getDictionary,
  initialData: {}
})

const $language = createStore<AvailableLocales | null>(null)
  .on([changeLanguage, loadUserLanguage.doneData], (_, payload) => payload)

const $nonNullableLanugage = $language.map(language => String(language || AvailableLocales.enUS))
const $isLanguageExists = $language.map(language => Boolean(language))

forward({
  from: init,
  to: loadUserLanguage
})

forward({
  from: changeLanguage,
  to: saveLanguageToLocalStorage
})

guard({
  source: $nonNullableLanugage.updates,
  filter: $isLanguageExists,
  target: loadDictionary
})

export {
  $intl,
  $intlData,
  $language,
  loadDictionary,
  changeLanguage,
  init
}

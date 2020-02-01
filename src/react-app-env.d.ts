/// <reference types="react-scripts" />
/// <reference types="./types/declarations/global" />
/// <reference types="./types/declarations/sergei-model" />

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export = classes
}

declare module 'less-vars-to-js'

declare module 'browser-locale' {
  function getBrowserLocale(): string
  export = getBrowserLocale
}

declare interface IDictionary<T = unknown> {
  [key: string]: T
}

declare interface IDataStore<T = unknown> {
  loading: boolean
  data: T
  error: string | null
}

declare type Skills =
  | 'ts'
  | 'js'
  | 'vcs'
  | 'git'
  | 'safari'
  | 'deploy'
  | 'react'
  | 'vue'
  | 'dp'
  | 'markup'

declare interface ISkill {
  key: Skills
  image: string
  translateKey: string
}

declare type Project =
  | 'pedant'
  | 'testingSystem'
  | 'crmSystem'
  | 'tradeIn'

declare interface IProject {
  key: Project
  translateKey: string
  image: string
}

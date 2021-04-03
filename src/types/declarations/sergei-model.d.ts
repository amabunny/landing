declare type TSergeiSkill =
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

declare interface ISergeiSkill {
  key: TSergeiSkill
  image: string
  translateKey: string
}

declare type TSergeiProjec =
  | 'pedant'
  | 'testingSystem'
  | 'crmSystem'
  | 'tradeIn'

declare interface ISergeiProject {
  key: TSergeiProjec
  translateKey: string
  image: string
  detailedImages?: string[]
  detailedDescription?: string
}

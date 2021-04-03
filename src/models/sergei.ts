export class SergeiModel {
  static path = 'sergei'

  static avatarUrl = `${SergeiModel.path}/bbavatar.jpg`

  static nickname = '@mabunny'

  static bornYear = 1996

  static get skills (): ISergeiSkill[] {
    return [
      {
        key: 'ts',
        image: SergeiModel.getSkillImage('ts'),
        translateKey: 'skills.ts'
      },
      {
        key: 'js',
        image: SergeiModel.getSkillImage('js'),
        translateKey: 'skills.js'
      },
      {
        key: 'dp',
        image: SergeiModel.getSkillImage('dp'),
        translateKey: 'skills.dp'
      },
      {
        key: 'vcs',
        image: SergeiModel.getSkillImage('git'),
        translateKey: 'skills.vcs'
      },
      {
        key: 'safari',
        image: SergeiModel.getSkillImage('safari'),
        translateKey: 'skills.safari'
      },
      {
        key: 'deploy',
        image: SergeiModel.getSkillImage('deploy'),
        translateKey: 'skills.deploy'
      },
      {
        key: 'react',
        image: SergeiModel.getSkillImage('react'),
        translateKey: 'skills.react'
      },
      {
        key: 'vue',
        image: SergeiModel.getSkillImage('vue'),
        translateKey: 'skills.vue'
      },
      {
        key: 'markup',
        image: SergeiModel.getSkillImage('markup'),
        translateKey: 'skills.markup'
      }
    ]
  }

  static getSkillImage (skill: TSergeiSkill) {
    return `${SergeiModel.path}/skills/${skill}.png`
  }

  static get projects (): ISergeiProject[] {
    return [
      {
        key: 'pedant',
        translateKey: 'projects.pedant',
        image: SergeiModel.getProjectImage('pedant'),
        detailedImages: []
      },
      {
        key: 'crmSystem',
        translateKey: 'projects.crmSystem',
        image: SergeiModel.getProjectImage('crmSystem')
      },
      {
        key: 'testingSystem',
        translateKey: 'projects.testingSystem',
        image: SergeiModel.getProjectImage('testingSystem')
      },
      {
        key: 'tradeIn',
        translateKey: 'projects.tradeIn',
        image: SergeiModel.getProjectImage('tradeIn')
      }
    ]
  }

  static getProjectImage (project: TSergeiProjec) {
    return `${SergeiModel.path}/projects/${project}.png`
  }
}

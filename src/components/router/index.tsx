import React from 'react'
import { Router as ReachRouter } from '@reach/router'

import { SkillsPage } from 'features/skills'
import { TodosPage } from 'features/todos'
import { AboutMePage } from 'features/about-me'
import { SettingsPage } from 'features/settings'
import { SequencesPage } from 'features/sequences'

export const Router = () => (
  <ReachRouter>
    <AboutMePage path='/' />
    <SkillsPage path='/skills' />
    <TodosPage path='/todos' />
    <SettingsPage path='/settings' />
    <SequencesPage path='/sequences' />
  </ReachRouter>
)

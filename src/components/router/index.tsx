import React from 'react'
import { Router as ReachRouter } from '@reach/router'
import { RoutesService } from 'services/routes'

import { SkillsPage } from 'features/skills'
import { TodosPage } from 'features/todos'
import { AboutMePage } from 'features/about-me'
import { SettingsPage } from 'features/settings'

export const Router = () => (
  <ReachRouter>
    <AboutMePage path={RoutesService.getIndex()} />
    <SkillsPage path={RoutesService.getSkills()} />
    <TodosPage path={RoutesService.getTodos()} />
    <SettingsPage path={RoutesService.getSettings()} />
  </ReachRouter>
)

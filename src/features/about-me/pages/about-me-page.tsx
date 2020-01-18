import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from 'ui'
import { AboutMe } from '../organisms/root'

export const AboutMePage: FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      <AboutMe />
    </BaseTemplate>
  )
}

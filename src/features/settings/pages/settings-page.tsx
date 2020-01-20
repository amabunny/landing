import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate, Container } from 'ui'
import { SettingsForm } from '../organisms/settings-form'

export const SettingsPage: FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      <Container>
        <SettingsForm />
      </Container>
    </BaseTemplate>
  )
}

import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate, Container } from 'ui'

export const SequencesPage: FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      <Container>
        its sequences page!
      </Container>
    </BaseTemplate>
  )
}

import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate, Container } from 'ui'
import { Todos } from '../organisms/root'

export const TodosPage: FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      <Container>
        <Todos />
      </Container>
    </BaseTemplate>
  )
}

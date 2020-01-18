import React, {FC} from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from 'ui'

export const TodosPage: FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      its todos page!
    </BaseTemplate>
  )
}

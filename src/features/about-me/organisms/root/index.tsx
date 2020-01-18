import React from 'react'
import { Container } from 'ui'
import { Typography } from 'antd'
import { FormattedMessage } from 'react-intl'
import { SergeiModel } from 'models/sergei'
import { ProjectsPreviewList } from '../projects-preview-list'
import classes from './style.module.less'

export const AboutMe = () => {
  return (
    <Container>
      <Typography.Title>
        <FormattedMessage id='aboutMe.title' />
      </Typography.Title>

      <Typography.Paragraph className={classes.paragraph}>
        <FormattedMessage
          id='aboutMe.basicInfo'
          values={{
            old: new Date().getFullYear() - SergeiModel.bornYear
          }}
        />
      </Typography.Paragraph>

      <br />

      <div>
        <ProjectsPreviewList />
      </div>
    </Container>
  )
}

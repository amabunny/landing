import React, { useMemo } from 'react'
import { Container } from 'ui'
import { Typography, Divider } from 'antd'
import { FormattedMessage } from 'react-intl'
import { SergeiModel } from 'models/sergei'
import { ProjectsPreviewList } from '../projects-preview-list'
import classes from './style.module.less'

export const AboutMe = () => {
  const basicInfoValues = useMemo(() => ({
    old: new Date().getFullYear() - SergeiModel.bornYear
  }), [])

  return (
    <Container>
      <Typography.Title>
        <FormattedMessage id='aboutMe.title' />
      </Typography.Title>

      <Typography.Paragraph className={classes.paragraph}>
        <FormattedMessage
          id='aboutMe.basicInfo'
          values={basicInfoValues}
        />
      </Typography.Paragraph>

      <Divider />

      <div>
        <ProjectsPreviewList />
      </div>
    </Container>
  )
}

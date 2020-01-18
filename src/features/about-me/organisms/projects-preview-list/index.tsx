import React from 'react'
import { useIntl } from 'react-intl'
import { SergeiModel } from 'models/sergei'
import { ProjectPreview } from '../../molecules/project-preview'
import classes from './style.module.less'

export const ProjectsPreviewList = () => {
  const { formatMessage } = useIntl()

  return (
    <div className={classes.list}>
      {SergeiModel.projects.map(({ image, key, translateKey }) => {
        const title = formatMessage({ id: `${translateKey}.title` })
        const desc = formatMessage({ id: `${translateKey}.desc` })

        return (
          <ProjectPreview
            desc={desc}
            imageSrc={image}
            key={key}
            title={title}
          />
        )
      })}
    </div>
  )
}

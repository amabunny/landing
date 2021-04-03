import React from 'react'
import { useIntl } from 'react-intl'
import { SergeiModel } from 'models/sergei'
import { ProjectPreview, ProjectPreviewModes } from '../../molecules/project-preview'
import { ProjectModal } from '../../molecules/project-modal'
import classes from './style.module.less'

export const ProjectsPreviewList = () => {
  const [hoveredKey, setHoveredKey] = React.useState<string | null>(null)
  const [selectedProject, setSelectedProject] = React.useState<ISergeiProject | null>(null)
  const { formatMessage } = useIntl()

  const handleProjectPreviewHover = React.useCallback((key: string) => {
    setHoveredKey(key)
  }, [])

  const handleProjectPreviewLeave = React.useCallback(() => {
    setHoveredKey(null)
  }, [])

  const handleModalClose = React.useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <div className={classes.list}>
      {SergeiModel.projects.map(project => {
        const { image, key, translateKey } = project
        const title = formatMessage({ id: `${translateKey}.title` })
        const desc = formatMessage({ id: `${translateKey}.desc` })

        const cardMode = hoveredKey && hoveredKey !== key
          ? ProjectPreviewModes.INACTIVE
          : ProjectPreviewModes.NORMAL

        return (
          <ProjectPreview
            className={classes.projectPreview}
            desc={desc}
            id={key}
            imageSrc={image}
            key={key}
            mode={cardMode}
            onClick={() => setSelectedProject(project)}
            onHover={handleProjectPreviewHover}
            onLeave={handleProjectPreviewLeave}
            title={title}
          />
        )
      })}

      <ProjectModal
        onClose={handleModalClose}
        project={selectedProject}
        visible={Boolean(selectedProject)}
      />
    </div>
  )
}

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, Typography, Image } from 'antd'

interface IProjectModal {
  visible: boolean
  onClose: () => void
  project?: ISergeiProject | null
}

export const ProjectModal = ({ visible, onClose, project }: IProjectModal) => {
  return (
    <Modal
      onCancel={onClose}
      title={(
        <Typography>
          {project?.translateKey && (
            <FormattedMessage id={`${project.translateKey}.title`} />
          )}
        </Typography>
      )}
      visible={visible}
      width='60%'
    >
      {project && (
        <>
          <Typography>
            <FormattedMessage id={`${project.translateKey}.desc`} />
          </Typography>

          <br />

          <Image src={project.image} />
        </>
      )}
    </Modal>
  )
}

import React, { useMemo } from 'react'
import { Card } from 'antd'

interface IProps {
  imageSrc: string
  desc: string
  title: string
}

export const ProjectPreview = ({ imageSrc, desc, title }: IProps) => {
  const cover = useMemo(() => (
    <img
      alt={title}
      src={imageSrc}
    />
  ), [imageSrc, title])

  return (
    <Card cover={cover}>
      <Card.Meta
        description={desc}
        title={title}
      />
    </Card>
  )
}

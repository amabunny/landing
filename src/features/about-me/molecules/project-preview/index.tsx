import React, { useMemo } from 'react'
import cn from 'classnames'
import { Card } from 'antd'
import styles from './style.module.less'

export enum ProjectPreviewModes {
  NORMAL,
  INACTIVE
}

interface IProps {
  imageSrc: string
  desc: string
  title: string
  className?: string
  onHover?: (key: string) => void
  onLeave?: () => void
  onClick?: () => void
  mode?: ProjectPreviewModes
  id?: string | number
}

export const ProjectPreview = ({
  imageSrc,
  desc,
  title,
  className,
  onHover,
  id,
  onLeave,
  mode,
  onClick
}: IProps) => {
  const handleMouseOver = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget.dataset

    if (id && onHover) {
      onHover(id)
    }
  }, [onHover])

  const cover = useMemo(() => (
    <img
      alt={title}
      src={imageSrc}
    />
  ), [imageSrc, title])

  return (
    <Card
      className={cn(styles.card, className, {
        [styles.inactive]: mode === ProjectPreviewModes.INACTIVE
      })}
      cover={cover}
      data-id={id}
      onClick={onClick}
      onMouseLeave={onLeave}
      onMouseOver={handleMouseOver}
    >
      <Card.Meta
        description={desc}
        title={title}
      />
    </Card>
  )
}

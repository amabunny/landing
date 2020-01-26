import React, { useMemo, useCallback } from 'react'
import cn from 'classnames'
import { Card, Checkbox, Tooltip, Icon } from 'antd'
import { FormattedDate, FormattedMessage } from 'react-intl'
import { updateTodo, removeTodo } from '../../model'
import { ITodo } from 'types/todos'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const Todo = ({ text, className, created, doneDate, deadline }: ITodo & IProps) => {
  const onDoneToggle = useCallback(() => {
    const newDoneDate = doneDate
      ? undefined
      : new Date().getTime()

    updateTodo({
      created,
      text,
      deadline,
      doneDate: newDoneDate
    })
  }, [created, text, deadline, doneDate])

  const onRemoveClick = useCallback(() => {
    removeTodo(created)
  }, [created])

  const formattedDateProps = useMemo((): Intl.DateTimeFormatOptions => ({
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }), [])

  const tooltipOverlayMessageId = useMemo(() => (
    doneDate
      ? 'todos.undone'
      : 'todos.completed'
  ), [doneDate])

  const cardStyle = useMemo((): React.CSSProperties => ({
    opacity: doneDate ? 0.5 : 1
  }), [doneDate])

  return (
    <Card
      className={cn(className, classes.card)}
      style={cardStyle}
      title={(
        <div className={classes.cardTitle}>
          <span>
            <FormattedDate
              value={created}
              {...formattedDateProps}
            />
          </span>

          <div>
            <Tooltip overlay={<FormattedMessage id={tooltipOverlayMessageId} />}>
              <Checkbox
                checked={Boolean(doneDate)}
                onChange={onDoneToggle}
              />
            </Tooltip>
          </div>

          <div>
            <Tooltip overlay={<FormattedMessage id='todos.remove' />}>
              <Icon
                className={classes.removeIcon}
                onClick={onRemoveClick}
                type='delete'
              />
            </Tooltip>
          </div>
        </div>
      )}
    >
      <div>
        {text}
      </div>

      {doneDate && (
        <div className={classes.completedDate}>
          <strong>
            <FormattedMessage id='todos.completedDate' />&nbsp;
          </strong>
          <span>
            <FormattedDate
              value={doneDate}
              {...formattedDateProps}
            />
          </span>
        </div>
      )}
    </Card>
  )
}

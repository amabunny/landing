import React from 'react'
import cn from 'classnames'
import { Card } from 'antd'
import { ITodo } from 'types/todos'

interface IProps {
  className?: string
}

export const Todo = ({ text, className }: ITodo & IProps) => {
  return (
    <Card className={cn(className)}>
      {text}
    </Card>
  )
}

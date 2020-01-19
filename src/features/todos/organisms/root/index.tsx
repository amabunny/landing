import React from 'react'
import { Filters } from '../filters'
import { TodoAddForm } from '../todo-add-form'
import classes from './style.module.less'

export const Todos = () => {
  return (
    <div className={classes.wrapper}>
      <Filters className={classes.filters} />

      <TodoAddForm className={classes.form} />
    </div>
  )
}

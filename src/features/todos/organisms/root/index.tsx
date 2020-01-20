import React from 'react'
import { useStore } from 'effector-react'
import { Filters } from '../filters'
import { TodoAddForm } from '../todo-add-form'
import { Todo } from '../../molecules/todo'
import { $todos } from '../../model'
import classes from './style.module.less'

export const Todos = () => {
  const todos = useStore($todos)

  return (
    <div className={classes.wrapper}>
      <Filters className={classes.filters} />

      <div className={classes.todos}>
        {todos.map(({ deadline, text, doneDate, created }) => (
          <Todo
            created={created}
            deadline={deadline}
            doneDate={doneDate}
            key={created}
            text={text}
          />
        ))}
      </div>

      <TodoAddForm className={classes.form} />
    </div>
  )
}

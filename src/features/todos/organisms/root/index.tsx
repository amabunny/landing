import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import { notification } from 'antd'
import { Filters } from '../filters'
import { TodoAddForm } from '../todo-add-form'
import { Todo } from '../../molecules/todo'
import { $todos, init, getAllTodos, reset } from '../../model'
import classes from './style.module.less'

export const Todos = () => {
  const todos = useStore($todos)

  useEffect(() => {
    init()

    const getAllTodosErrorSub = getAllTodos.fail.watch(({ error }) => {
      notification.error({ message: error.message })
    })

    return () => {
      getAllTodosErrorSub.unsubscribe()
      reset()
    }
  }, [])

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

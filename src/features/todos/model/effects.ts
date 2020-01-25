import { createEffect } from 'effector'
import { ITodo } from 'types/todos'

export const addTodo = createEffect<ITodo, ITodo, Error>()

export const getAllTodos = createEffect<void, ITodo[], Error>()

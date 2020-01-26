import { createEffect } from 'effector'
import { ITodo } from 'types/todos'

export const addTodo = createEffect<ITodo, ITodo, Error>()

export const updateTodo = createEffect<ITodo, ITodo, Error>()

export const getAllTodos = createEffect<void, ITodo[], Error>()

export const init = createEffect<void, unknown, Error>()

export const reset = createEffect<void, unknown, Error>()

export const removeTodo = createEffect<number, ITodo, Error>()

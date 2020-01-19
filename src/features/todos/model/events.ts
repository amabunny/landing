import { createEvent } from 'effector'
import { TodoFilterTypes, ITodo } from '../types'

export const changeFilterType = createEvent<TodoFilterTypes>()

export const changeSearchString = createEvent<string>()

export const addTodo = createEvent<ITodo>()

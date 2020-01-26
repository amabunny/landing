import { createEvent } from 'effector'
import { TodoFilterTypes } from 'types/todos'

export const changeFilterType = createEvent<TodoFilterTypes>()

export const changeSearchString = createEvent<string>()

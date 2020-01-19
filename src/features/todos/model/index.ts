import { createStore } from 'effector'
import { changeFilterType, changeSearchString, addTodo } from './events'
import { ITodo, TodoFilterTypes } from '../types'

const initialState: ITodo[] = []

/** Stores */

/** Store: contains array of to-do items
 * @see ITodo
 * */
const $todos = createStore(initialState)

$todos
  .on(addTodo, (state, payload) => state.concat(payload))

/** Store: current filter type based on task status enum values
 * @see TodoFilterTypes
 * */
const $filterType = createStore(TodoFilterTypes.ALL)

$filterType
  .on(changeFilterType, (_, payload) => payload)

/** Store: search string to find tasks with same text */
const $searchString = createStore('')

$searchString
  .on(changeSearchString, (_, payload) => payload)

/** End of stores */

export {
  $todos,
  $filterType,
  $searchString,
  changeFilterType,
  changeSearchString,
  addTodo
}

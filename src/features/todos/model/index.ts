import { createStore, forward, merge } from 'effector'
import { TodosModel } from 'models/todos'
import { changeFilterType, changeSearchString, errorReceived } from './events'
import { getAllTodos, addTodo, updateTodo, removeTodo, init, reset } from './effects'
import { ITodo, TodoFilterTypes } from 'types/todos'

const todosModel = new TodosModel()

const initialState: ITodo[] = []

/** Stores */

/** Store: contains array of to-do items
 * @see ITodo
 * */
const $todos = createStore(initialState)

$todos
  .on(getAllTodos.done, (_, { result }) => result)
  .on(addTodo.done, (state, { result }) => state.concat(result))
  .on(removeTodo.done, (state, { params }) => state.filter(item => item.created !== params))
  .on(updateTodo.done, (state, { result }) => state.map(item => {
    if (item.created === result.created) {
      return result
    }

    return item
  }))

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

/** Set handlers to effects */
init.use(async () => {
  await todosModel.openConnection()
  await getAllTodos()
})

getAllTodos.use(() => {
  return todosModel.getAll()
})

addTodo.use(value => {
  return todosModel.add(value)
})

reset.use(() => {
  return todosModel.closeConnection()
})

updateTodo.use(todo => {
  return todosModel.update(todo)
})

removeTodo.use(taskCreated => {
  return todosModel.remove(taskCreated)
})
/** End of set handlers to effects */

/* Side-effects */
forward({
  from: merge([
    getAllTodos.fail,
    addTodo.fail,
    reset.fail,
    updateTodo.fail,
    removeTodo.fail
  ]),
  to: errorReceived
})
/* End of side-effects */

export {
  $todos,
  $filterType,
  $searchString,
  getAllTodos,
  changeFilterType,
  changeSearchString,
  addTodo,
  updateTodo,
  removeTodo,
  init,
  reset,
  errorReceived
}

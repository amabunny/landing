import { createStore } from 'effector'
import { TodosModel } from 'models/todos'
import { changeFilterType, changeSearchString, init, reset } from './events'
import { getAllTodos, addTodo } from './effects'
import { ITodo, TodoFilterTypes } from 'types/todos'

let todosModel: TodosModel = new TodosModel()

const initialState: ITodo[] = []

/** Stores */

/** Store: contains array of to-do items
 * @see ITodo
 * */
const $todos = createStore(initialState)

$todos
  .on(addTodo.done, (state, { result }) => state.concat(result))
  .on(getAllTodos.done, (_, { result }) => result)

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

/** Side-effects */
init.watch(async () => {
  todosModel = new TodosModel()
  await todosModel.openConnection()

  getAllTodos.use(async () => {
    return todosModel.getAll()
  })

  addTodo.use(value => {
    return todosModel.add(value)
  })

  getAllTodos()
})

reset.watch(async () => {
  await todosModel.closeConnection()
})

addTodo.watch(todo => {
  if (todosModel) {
    todosModel.add(todo)
  }
})
/** End of side-effects */

export {
  $todos,
  $filterType,
  $searchString,
  getAllTodos,
  changeFilterType,
  changeSearchString,
  addTodo,
  init,
  reset
}

import Dexie from 'dexie'
import { ITodo } from 'types/todos'

export class TodosModel {
  static dbVersion = 3
  static dbName = 'todos'
  static objectStoreName = `${TodosModel.dbName}ObjectStore`

  static messages = {
    CONNECTION_NOT_OPENED: 'DB connection is not opened'
  }

  private db: Dexie | null = null

  public async openConnection () {
    this.db = new Dexie(TodosModel.dbName)

    this.db.version(TodosModel.dbVersion).stores({
      [TodosModel.objectStoreName]: '++created, text, deadline, doneDate'
    })

    this.log('db connection is successfully opened')
  }

  public closeConnection () {
    if (this.db) {
      this.db.close()
      this.log('db connection closed')
    } else {
      const errorMsg = TodosModel.messages.CONNECTION_NOT_OPENED
      const error = new Error(errorMsg)
      throw error
    }
  }

  public async add (value: ITodo) {
    if (this.db) {
      await this.db.table<ITodo, number>(TodosModel.objectStoreName).add(value)
      return value
    } else {
      const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
      throw error
    }
  }

  public getAll (whereCb?: (table: Dexie.Table<ITodo, number>) => Dexie.Collection<ITodo, number>) {
    if (this.db) {
      const table = this.db.table<ITodo, number>(TodosModel.objectStoreName)

      if (whereCb) {
        return whereCb(table).toArray()
      }

      return table.toArray()
    } else {
      const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
      throw error
    }
  }

  public async update (todo: ITodo) {
    if (this.db) {
      await this.db.table<ITodo, number>(TodosModel.objectStoreName).put(todo)
      return todo
    } else {
      const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
      throw error
    }
  }

  public async remove (taskCreated: number) {
    if (this.db) {
      return this.db.table<ITodo, number>(TodosModel.objectStoreName).delete(taskCreated)
    } else {
      const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
      throw error
    }
  }

  private log (message: any) {
    console.log(`[${TodosModel.dbName}]:`, message)
  }
}

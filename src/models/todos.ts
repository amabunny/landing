import { ITodo } from 'types/todos'

export class TodosModel {
  static dbVersion = 3
  static dbName = 'todos'
  static objectStoreName = `${TodosModel.dbName}ObjectStore`

  static messages = {
    CONNECTION_NOT_OPENED: 'DB connection is not opened'
  }

  private db: IDBDatabase | null = null

  public openConnection () {
    return new Promise((resolve, reject) => {
      const self = this
      const openDbRequest = window.indexedDB.open(TodosModel.dbName, TodosModel.dbVersion)

      openDbRequest.onsuccess = function () {
        self.db = this.result
        self.log('db connection opened')
        resolve()
      }

      openDbRequest.onerror = () => {
        const errorMsg = 'an error occured during db open'
        self.log(errorMsg)
        const error = new Error(errorMsg)
        reject(error)
      }

      openDbRequest.onupgradeneeded = function () {
        self.db = this.result

        if (!self.db.objectStoreNames.length) {
          self.db.createObjectStore(TodosModel.objectStoreName, { keyPath: 'created' })
        } else {
          self.db.deleteObjectStore(TodosModel.objectStoreName)
          self.db.createObjectStore(TodosModel.objectStoreName, { keyPath: 'created' })
        }

        self.log('db successfully updated')
      }
    })
  }

  public closeConnection () {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close()
        this.log('db connection closed')
        resolve()
      } else {
        const errorMsg = TodosModel.messages.CONNECTION_NOT_OPENED
        const error = new Error(errorMsg)
        reject(error)
      }
    })
  }

  public add (value: ITodo) {
    return new Promise<ITodo>((resolve, reject) => {
      if (this.db) {
        const request = this.db
          .transaction(TodosModel.objectStoreName, 'readwrite')
          .objectStore(TodosModel.objectStoreName).add(value)

        request.onsuccess = () => {
          resolve(value)
        }

        request.onerror = () => {
          const error = new Error('Incorrect or existing value')
          reject(error)
        }
      } else {
        const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
        reject(error)
      }
    })
  }

  public getAll () {
    return new Promise<ITodo[]>((resolve, reject) => {
      if (this.db) {
        const request = this.db
          .transaction(TodosModel.objectStoreName, 'readonly')
          .objectStore(TodosModel.objectStoreName)
          .getAll()

        request.onsuccess = function () {
          resolve(this.result)
        }

        request.onerror = () => {
          const error = new Error('Error during item list request')
          reject(error)
        }
      } else {
        const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
        reject(error)
      }
    })
  }

  public update (taskCreated: number, updatingData: Omit<ITodo, 'created'>) {
    return new Promise<ITodo>((resolve, reject) => {
      if (this.db) {
        const request = this.db
          .transaction(TodosModel.objectStoreName, 'readwrite')
          .objectStore(TodosModel.objectStoreName)
          .openCursor()

        request.onsuccess = function () {
          if (this.result) {
            if (this.result.value.created === taskCreated) {
              const task: ITodo = {
                ...this.result.value,
                ...updatingData
              }

              const updateRequest = this.result.update(task)

              updateRequest.onsuccess = () => {
                resolve(task)
              }

              updateRequest.onerror = () => {
                const error = new Error('Error during task update')
                reject(error)
              }
            } else {
              this.result.continue()
            }
          }
        }

        request.onerror = () => {
          const error = new Error('Cursor request error')
          reject(error)
        }
      } else {
        const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
        reject(error)
      }
    })
  }

  public remove (taskCreated: number) {
    return new Promise<ITodo>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db
          .transaction(TodosModel.objectStoreName, 'readwrite')
          .objectStore(TodosModel.objectStoreName)
          .openCursor()

        transaction.onsuccess = function () {
          if (this.result) {
            if (this.result.value.created === taskCreated) {
              const deletingTask: ITodo = { ...this.result.value }
              const request = this.result.delete()

              request.onsuccess = () => {
                resolve(deletingTask)
              }

              request.onerror = () => {
                const error = new Error('Error during task deleting')
                reject(error)
              }
            } else {
              this.result.continue()
            }
          }
        }
      } else {
        const error = new Error(TodosModel.messages.CONNECTION_NOT_OPENED)
        reject(error)
      }
    })
  }

  private log (message: any) {
    console.log(`[${TodosModel.dbName}]:`, message)
  }
}

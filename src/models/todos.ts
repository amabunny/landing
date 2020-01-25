import { ITodo } from 'types/todos'

export class TodosModel {
  static dbVersion = 3
  static dbName = 'todos'
  static objectStoreName = `${TodosModel.dbName}ObjectStore`

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
        const errorMsg = 'DB is not opened'
        const error = new Error(errorMsg)
        reject(error)
      }
    })
  }

  public add (value: ITodo) {
    return new Promise<ITodo>((resolve, reject) => {
      if (this.db) {
        const transation = this.db.transaction(TodosModel.objectStoreName, 'readwrite')
        transation.objectStore(TodosModel.objectStoreName).add(value)

        transation.oncomplete = () => {
          resolve(value)
        }

        transation.onerror = () => {
          const error = new Error('Incorrect or existing value')
          reject(error)
        }
      } else {
        const error = new Error('DB connection is not opened')
        reject(error)
      }
    })
  }

  public getAll () {
    const self = this

    return new Promise<ITodo[]>((resolve, reject) => {
      if (self.db) {
        const transaction = self.db.transaction(TodosModel.objectStoreName, 'readonly')
        const request = transaction.objectStore(TodosModel.objectStoreName).getAll()

        request.onsuccess = function () {
          resolve(this.result)
        }

        request.onerror = () => {
          const error = new Error('Error during item list request')
          reject(error)
        }
      } else {
        const error = new Error('DB connection is not opened')
        reject(error)
      }
    })
  }

  private log (message: any) {
    console.log(`[${TodosModel.dbName}]:`, message)
  }
}

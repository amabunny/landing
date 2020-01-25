export interface ITodo {
  text: string
  deadline?: number
  doneDate?: number
  created: number
}

export enum TodoFilterTypes {
  DONE= 'done',
  UNDONE = 'undone',
  ALL = 'all'
}

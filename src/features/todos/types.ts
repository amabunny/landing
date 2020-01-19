import { Moment } from 'moment'

export interface ITodo {
  text: string
  deadline?: Moment
  doneDate?: Moment
}

export enum TodoFilterTypes {
  DONE= 'done',
  UNDONE = 'undone',
  ALL = 'all'
}

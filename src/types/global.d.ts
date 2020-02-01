declare interface IDictionary<T = unknown> {
  [key: string]: T
}

declare interface IDataStore<T = unknown> {
  loading: boolean
  data: T
  error: string | null
}

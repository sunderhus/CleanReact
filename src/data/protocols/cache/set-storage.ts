export interface SetStorage<T> {
  set: (key: string, value: T) => Promise<void>
}

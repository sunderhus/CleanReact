export interface GetStorage<R = any> {
  get: (key: string) => R
}

import { GetStorage } from '@/data/protocols/cache/get-storage'
import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  get<R = unknown> (key: string): R {
    const savedData = JSON.parse(localStorage.getItem(key))
    return savedData
  }

  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

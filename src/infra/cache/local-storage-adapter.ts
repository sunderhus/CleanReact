import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter<T> implements SetStorage<T> {
  set (key: string, value: T): void {
    localStorage.setItem(key, String(value))
  }
}

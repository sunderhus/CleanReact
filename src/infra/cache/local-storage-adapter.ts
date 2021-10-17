import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdapter<T> implements SetStorage<T> {
  async set (key: string, value: T): Promise<void> {
    await localStorage.setItem(key, String(value))
  }
}

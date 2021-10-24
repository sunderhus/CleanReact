import { SetStorage } from '@/data/protocols/cache/set-storage'

export class SetStorageMock<T> implements SetStorage<T> {
  key: string;
  value: T;

  async set (key: string, value: T): Promise<void> {
    this.key = key
    this.value = value

    return Promise.resolve()
  }
}

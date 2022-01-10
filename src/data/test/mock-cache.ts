import { SetStorage } from '@/data/protocols/cache/set-storage'

export class SetStorageMock<T> implements SetStorage<T> {
  key: string;
  value: T;

  set (key: string, value: T): void {
    this.key = key
    this.value = value
  }
}

import { Service } from '@angular/core';

@Service()
export class StorageService {
  saveData<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }
}

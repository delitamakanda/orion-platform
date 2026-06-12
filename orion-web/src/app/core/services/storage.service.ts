import { Service } from '@angular/core';

@Service()
export class StorageService {

    saveData(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getData(key: string): any {
        const data = localStorage.getItem(key);
        return data? JSON.parse(data) : null;
    }
}

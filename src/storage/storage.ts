import { Category } from '../category/category';

export class Storage {
    private static readonly STORAGE_KEY = 'todo';
    private static cachedData: Category[] | undefined = undefined;

    static setStorage(categoryArray: Category[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categoryArray));
        Storage.cachedData = undefined;
    }

    static getStorage(): Category[] {
        if (Storage.cachedData) {
            return Storage.cachedData;
        }

        const todoString = localStorage.getItem(this.STORAGE_KEY);
        if (todoString) {
            try {
                const data = JSON.parse(todoString);
                Storage.cachedData = data;
                return data;
            } catch (error) {
                console.error('Error parsing data from storage:', error);
                return [];
            }
        }
        return [];
    }
}

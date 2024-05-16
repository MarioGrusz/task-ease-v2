import { Category } from "../category/category";

export class Storage {
  private static readonly STORAGE_KEY = 'todo';

  static setStorage(categoryArray: Category[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categoryArray));
  }

  static getStorage(): Category[] {
    const todoString = localStorage.getItem(this.STORAGE_KEY);
    if (todoString) {
      try {
        return JSON.parse(todoString);
      } catch (error) {
        console.error('Error parsing data from storage:', error);
        return [];
      }
    }
    return [];
  }

}
  
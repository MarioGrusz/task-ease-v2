import { it, expect, describe } from 'vitest';
import { Storage, ICategory } from './storage'


describe('Storage', () => {

    it('should add items to storage', () => {
        const categoryArray = [{ id: 1, name: 'Test Todo', tasks: [] }];
        Storage.addToStorage(categoryArray);
        expect(localStorage.getItem('todo')).toBe(JSON.stringify(categoryArray));
    });

    it('should retrieve empty array if no data in storage', () => {
        localStorage.clear();
        expect(Storage.getStorage()).toEqual([]);
    });
      
    it('should retrieve stored data from storage', () => {
        const categoryArray = [{ id: 1, name: 'Test Todo', tasks: [] }];
        localStorage.setItem('todo', JSON.stringify(categoryArray));
        expect(Storage.getStorage()).toEqual(categoryArray);
    });

    it('should update storage with new todo item', () => {
        const initialArray = [{ id: 1, name: 'Existing Todo', tasks: [] }];
        const newCategory: ICategory = { id: 2, name: 'New Todo', tasks: [] };
        localStorage.setItem('todo', JSON.stringify(initialArray));
        Storage.updateStorage(newCategory);
        const expectedArray = [...initialArray, newCategory];
        expect(localStorage.getItem('todo')).toBe(JSON.stringify(expectedArray));
    });

    it('should remove item from storage by id', () => {
        const categoryArray = [{ id: 1, name: 'Todo 1' }, { id: 2, name: 'Todo 2' }];
        localStorage.setItem('todo', JSON.stringify(categoryArray));
        Storage.removeFromStorage(1);
        const expectedArray = [{ id: 2, name: 'Todo 2' }];
        expect(localStorage.getItem('todo')).toBe(JSON.stringify(expectedArray));
    });
         
});




  
  
import { it, expect, describe } from 'vitest';
import { Storage } from './storage';
import { Category } from '../category/category';

const LOCAL_STORAGE_KEY = 'todo';

const mockCategories: Category[] = [
    new Category(
        'Test Todo',
        [
            {
                id: '8bccb94e-c69a-4c75-83cf-7aab4fade85c',
                name: 'one',
                completed: true,
                remainingTime: 120,
                parentCategoryId: '',
            },
        ],
        [50]
    ),
];

describe('Storage', () => {
    it('should set items in storage', () => {
        Storage.setStorage(mockCategories);
        expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify(mockCategories));
    });

    it('should retrieve empty array if no data in storage', () => {
        localStorage.clear();
        expect(Storage.getStorage()).toEqual([]);
        expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    });

    it('should retrieve stored data from storage', () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockCategories));
        expect(Storage.getStorage()).toEqual(mockCategories);
        expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    });
});

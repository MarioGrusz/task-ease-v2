import { test, expect, describe } from 'vitest';
import { Category } from './category';


describe('Category', () => {
  test('constructor sets name and generates a random ID', () => {
    const category = new Category('Test Category');
    expect(category.name).toBe('Test Category');
    expect(typeof category.id).toBe('string');
  });

  test('can add and delete tasks', () => {
    const category = new Category('Test Category');
    const task = { id: 'task1', name: 'Test Task', completed: false };
    category.addTask(task);
    expect(category.tasks).toContainEqual(task);
    category.deleteTask(task.id);
    expect(category.tasks).not.toContainEqual(task);
  });

  test('can retrieve a task by ID', () => {
    const category = new Category('Test Category');
    const task = { id: 'task1', name: 'Test Task', completed: false };
    category.addTask(task);
    const retrievedTask = category.getTaskById(task.id);
    expect(retrievedTask).toEqual(task);
  });

  test('can return completion ratio', () => {
    const category = new Category('Test Category');
    const task1 = { id: 'task1', name: 'Test Task', completed: false };
    const task2 = { id: 'task1', name: 'Test Task', completed: true };
    category.addTask(task1);
    category.addTask(task2);
    expect(category.getCompletionRatio()).toBe(1/2);
    
  })
});


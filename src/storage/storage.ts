import { Category } from "../category/category";

export interface ITask {
  id: string;
  name: string;
  completed?: boolean;
  remainingTime: number[]
};


// export class Storage {
  
//   static addToStorage(categoryArray: Category[]): void {
//     localStorage.setItem("todo", JSON.stringify(categoryArray));
//   }

//   static getStorage(): Category[] {
//     const todoString = localStorage.getItem("todo");
//     if (todoString) return JSON.parse(todoString);
//     return [];
//   }
      
//   static updateStorage(newTodo: Category): void {
//     let categoryArray = Storage.getStorage();
//     categoryArray.push(newTodo);
//     Storage.addToStorage(categoryArray);
//   }

//   static removeFromStorage(toRemoveId: number | string): void {
//     let categoryArray = Storage.getStorage();
//     const updatedArray = categoryArray.filter((item: Category) => item.id !== toRemoveId);
//     Storage.addToStorage(updatedArray);
//   }


//   static addTasksToCategory(categoryIdToFind: string, task: ITask){
//     let categoryArray = Storage.getStorage();
//     const category = categoryArray.find(category => category.id === categoryIdToFind);
//     if (!category) {
//       console.error(`Category with ID ${categoryIdToFind} not found.`);
//       return;
//     }
//     if (!category.tasks) category.tasks = [];
//     category.tasks.push(task);
//     Storage.addToStorage(categoryArray);
//   }

//   static toggleTaskCompleted(categoryId: string, taskId: string, newValue: boolean) {
//     let categoryArray = Storage.getStorage();
//     const category = categoryArray.find(category => category.id === categoryId);
//     const task =  category?.tasks.find(task => task.id === taskId);
//     if (task) task?.completed = newValue

//   }
// }


// Class for storing tasks in local storage
export class Storage {
  private static readonly STORAGE_KEY = 'todo';

  static addToStorage(categoryArray: Category[]): void {
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


  static updateStorage(newTodo: Category): void {
    let categoryArray = this.getStorage();
    categoryArray.push(newTodo);
    this.addToStorage(categoryArray);
  }

  static removeFromStorage(toRemoveId: number | string): void {
    let categoryArray = this.getStorage();
    const updatedArray = categoryArray.filter((item: Category) => item.id !== toRemoveId);
    this.addToStorage(updatedArray);
  }


  static addTasksToCategory(categoryIdToFind: string, task: ITask): boolean {
    let categoryArray = this.getStorage();
    const category = categoryArray.find(category => category.id === categoryIdToFind);
    if (!category) {
      console.error(`Category with ID ${categoryIdToFind} not found.`);
      return false;
    }
    if (!category.tasks) category.tasks = [];
    category.tasks.push(task);
    this.addToStorage(categoryArray);
    return true; // Indicate success
  }

  static toggleTaskCompleted(categoryId: string, taskId: string, newValue: boolean): void {
    let categoryArray = this.getStorage();
    const category = categoryArray.find(category => category.id === categoryId);
    if (!category) return; 

    const task = category?.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = newValue;
    } else {
      console.error(`Task with ID ${taskId} not found in category ${categoryId}`);
    }
    this.updateStorage(category);
  }
}
  
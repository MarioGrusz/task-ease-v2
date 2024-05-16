import { Storage } from "../storage/storage";

export class Task {

  parentCategoryId: string;
  id: string;
  name: string;
  remainingTime: number;
  completed: boolean;

  constructor(parentCategoryId: string = '', name: string, remainigTime: number, completed = false) {
    this.parentCategoryId = parentCategoryId;
    this.id = crypto.randomUUID();
    this.name = name;
    this.remainingTime = remainigTime;
    this.completed = completed;
  }
  

  static findTaskById(categoryId: string, taskId: string) {
    const categoryArray = Storage.getStorage(); 
    const category = categoryArray.find(category => category.id === categoryId);
    return category?.tasks.find(task => task.id === taskId);
    
  }

  
  static toggleCompleted(categoryId: string, taskId: string, newCompletedStatus: boolean) {
    let categoryArray = Storage.getStorage();
    const category = categoryArray.find(category => category.id === categoryId);

    if (category && taskId) {
      const taskIndex = category.tasks.findIndex(task => task.id === taskId);
      if (taskIndex!== -1) {
        category.tasks[taskIndex].completed = newCompletedStatus;
        Storage.setStorage(categoryArray);
      } else {
        console.error(`Task with ID ${taskId} not found in category ${categoryId}`);
      }
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  } 
  
  static updateRemainingTime(categoryId: string, taskId: string, newTime: number) {
    let categoryArray = Storage.getStorage();
    const category = categoryArray.find(category => category.id === categoryId);

    if (category && taskId) {
      const taskIndex = category.tasks.findIndex(task => task.id === taskId);
      if (taskIndex!== -1) {
        category.tasks[taskIndex].remainingTime = newTime;
        Storage.setStorage(categoryArray);
      } else {
        console.error(`Task with ID ${taskId} not found in category ${categoryId}`);
      }
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }

}
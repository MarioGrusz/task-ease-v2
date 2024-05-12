import { ITask } from "../category/category";

export interface ICategory {
    id: number | string,
    name: string,
    tasks: ITask[],
};

//change the storage for what i have in another branch


export class Storage {
  
    static addToStorage(categoryArray: ICategory[]): void {
      localStorage.setItem("todo", JSON.stringify(categoryArray));
    }
  
    static getStorage(): ICategory[] {
        const todoString = localStorage.getItem("todo");
        if (todoString) return JSON.parse(todoString);
        return [];
    }
       
    static updateStorage(newTodo: ICategory): void {
      let categoryArray = Storage.getStorage();
      categoryArray.push(newTodo);
      Storage.addToStorage(categoryArray);
    }
  
    static removeFromStorage(toRemoveId: number | string): void {
      let categoryArray = Storage.getStorage();
      const updatedArray = categoryArray.filter((item: ICategory) => item.id !== toRemoveId);
      Storage.addToStorage(updatedArray);
    }
}
  
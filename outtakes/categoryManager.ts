// import { ITask, Storage } from "../storage/storage";



// export class Category {
//     id: number | string;
//     name: string;
//     tasks?: ITask[] = [];
  
//     constructor(name: string, tasks: ITask[] = []) {
//       this.id = crypto.randomUUID();
//       this.name = name;
//       this.tasks = tasks;
//     }
// }



// export class CategoryManager {
//     private categories: Category[];
  
//     constructor(initialCategories: Category[] = []) {
//       this.categories = initialCategories;
//     }
  
//     addCategory(category: Category): void {
//       this.categories.push(category);
//       Storage.updateStorage(category);
//     }
  
//     removeCategory(categoryId: number | string): void {
//       const categoryIndex = this.categories.findIndex((cat) => cat.id === categoryId);
//       if (categoryIndex !== -1) {
//         this.categories.splice(categoryIndex, 1);
//         // Update storage (if applicable)
//         Storage.removeFromStorage(categoryId);
//       } else {
//         console.warn(`Category with ID "${categoryId}" not found`);
//       }
//     }
  
//     getCategoryById(categoryId: number | string): Category | undefined {
//       return this.categories.find((cat) => cat.id === categoryId);
//     }
  
//     updateCategory(categoryId: number | string, updatedCategory: Category): void {
//       const categoryIndex = this.categories.findIndex((cat) => cat.id === categoryId);
//       if (categoryIndex !== -1) {
//         this.categories[categoryIndex] = updatedCategory;
//         // Update storage (if applicable)
//         Storage.updateStorage(this.categories);
//       } else {
//         console.warn(`Category with ID "${categoryId}" not found`);
//       }
//     }
// }
  
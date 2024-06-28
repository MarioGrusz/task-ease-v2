import { Task } from "../task/task";
import { Storage } from "../storage/storage";
import { categoriesProgressBars } from "./categoryRenderer";
import { ProgressBar } from "../progressBar/progressBar";
import { validateId, generateUniqueId } from "../utils/utils";

export class Category {
  id: string;
  name: string;
  tasks: Task[] = [];
  taskRatio?: number = 0;

  constructor(
    name: string,
    tasks: Task[] = [],
    taskRatio: number = 0,
    id?: string
  ) {
    this.id = id || generateUniqueId();
    this.name = name;
    this.tasks = tasks;
    this.taskRatio = taskRatio;
  }

  static addCategory(newCategory: Category): void {
    let categories = Storage.getStorage();
    categories.push(newCategory);
    Storage.setStorage(categories);
  }

  static removeCategory(toRemoveId: number | string): void {
    if (!validateId(toRemoveId)) throw new Error("Invalid ID type");
    let categories = Storage.getStorage();
    const updatedCategories = categories.filter(
      (category) => category.id !== toRemoveId
    );
    Storage.setStorage(updatedCategories);
  }

  static findCategoryById(categoryId: string) {
    if (!validateId(categoryId)) throw new Error("Invalid ID type");
    const categoryArray = Storage.getStorage();
    return categoryArray.find((category) => category.id === categoryId);
  }

  static updateCategory(category: Category) {
    const categoryArray = Storage.getStorage();
    const categoryIndex = categoryArray.findIndex(
      (cat) => cat.id === category.id
    );
    categoryArray[categoryIndex] = category;
    Storage.setStorage(categoryArray);
  }

  addTasks(categoryToFindId: string, task: Task): void {
    const category = Category.findCategoryById(categoryToFindId);
    if (!category) {
      console.error(`Category with ID ${categoryToFindId} not found.`);
      return;
    }
    if (!category.tasks) category.tasks = [];
    category.tasks.push(task);
    Category.updateCategory(category);
    category.calculateCompletionRatio();
  }

  calculateCompletionRatio(): void {
    const category = Category.findCategoryById(this.id);
    if (!category) {
      console.error(`Category with ID ${this.id} not found.`);
      return;
    }
    const total = category.tasks?.length || 0;
    const completed =
      category.tasks?.filter((task) => task.completed).length || 0;

    category.taskRatio =
      total === 0 ? 0 : Math.floor(100 * (completed / total));

    Category.updateCategory(category);

    const progressBarElements = categoriesProgressBars.get(category.id);
    if (progressBarElements) {
      const { progressBarValue, progressBarFill } = progressBarElements;
      const progressBarInstance = new ProgressBar(
        category.taskRatio,
        progressBarValue,
        progressBarFill
      );
      progressBarInstance.update();
    }
  }

  static fromPlainObject(obj: any): Category {
    return new Category(obj.name, obj.tasks, obj.taskRatio, obj.id);
  }
}

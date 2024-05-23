import { Task } from '../task/task';
import { Storage } from '../storage/storage';

export class Category {
    id: string;
    name: string;
    tasks: Task[] = [];
    taskRatio?: number[] = [];

    constructor(name: string, tasks: Task[] = [], taskRatio: number[] = []) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.tasks = tasks;
        this.taskRatio = taskRatio;
    }

    private generateUniqueId(): string {
        try {
            return crypto.randomUUID();
        } catch (error) {
            return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
    }

    private static validateId(id: unknown): id is string {
        return typeof id === 'number' || typeof id === 'string';
    }

    save(): void {
        let categories = Storage.getStorage();
        categories.push(this);
        Storage.setStorage(categories);
    }

    static removeCategory(toRemoveId: Category['id']): void {
        if (!Category.validateId(toRemoveId)) throw new Error('Invalid ID type');
        let categories = Storage.getStorage();
        const updatedCategories = categories.filter((category) => category.id !== toRemoveId);
        Storage.setStorage(updatedCategories);
    }

    static findCategoryById(categoryId: string) {
        if (!this.validateId(categoryId)) throw new Error('Invalid ID type');
        const categoryArray = Storage.getStorage();
        return categoryArray.find((category) => category.id === categoryId);
    }

    static updateCategory(category: Category) {
        const categoryArray = Storage.getStorage();
        const categoryIndex = categoryArray.findIndex((cat) => cat.id === category.id);
        categoryArray[categoryIndex] = category;
        Storage.setStorage(categoryArray);
    }

    static addTasks(categoryIdToFind: string, task: Task): void {
        if (!this.validateId(categoryIdToFind)) throw new Error('Invalid ID type');
        const category = this.findCategoryById(categoryIdToFind);
        if (!category) {
            console.error(`Category with ID ${categoryIdToFind} not found.`);
            return;
        }
        if (!category.tasks) category.tasks = [];
        category.tasks.push(task);
        this.updateCategory(category);
    }

    public getCompletionRatio(): void {
        const total = this.tasks?.length;
        const completed = this.tasks?.filter((task) => task.completed).length;
        if (total && completed) this.taskRatio?.push(total === 0 ? 0 : completed / total);
    }
}

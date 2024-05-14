import { ITask } from "../storage/storage";
import { Storage } from "../storage/storage";

export class Category {

    id: number | string;
    name: string;
    tasks: ITask[] = [];
    taskRatio?: number[] = [];

    constructor(name: string, tasks: ITask[] = [], taskRatio: number[] = []) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.tasks = tasks;
        this.taskRatio = taskRatio;
    }

    private generateUniqueId(): number | string {
        try {
            return crypto.randomUUID();
        } catch (error) {
            return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
    }
    

    static addCategory(newCategory: Category): void {
        let categories = Storage.getStorage();
        categories.push(newCategory);
        Storage.setStorage(categories);
    }

    static findCategoryById(categoryId: string) {
        const categoryArray = Storage.getStorage(); 
        return categoryArray.find(category => category.id === categoryId);
    }

    static removeCategory(toRemoveId: number | string): void {
        let categories = Storage.getStorage();
        const updatedCategories = categories.filter((category) => category.id!== toRemoveId);
        Storage.setStorage(updatedCategories);
    }

    static updateCategory(category: Category) {
        const categoryArray = Storage.getStorage();
        const categoryIndex = categoryArray.findIndex(cat => cat.id === category.id);
        categoryArray[categoryIndex] = category;
        Storage.setStorage(categoryArray); 
    }

    static addTasks(categoryIdToFind: string, task: ITask): void {
        //let categories = Storage.getStorage();
        //const category = categories.find((category) => category.id === categoryIdToFind);
        const category = this.findCategoryById(categoryIdToFind)
        if (!category) {
            console.error(`Category with ID ${categoryIdToFind} not found.`);
            return;
        }
        if (!category.tasks) category.tasks = [];
        category.tasks.push(task);
        this.updateCategory(category)
        //category.getCompletionRatio();
        //Storage.setStorage(categories);
    }

    

    public getCompletionRatio(): void {
        const total = this.tasks?.length;
        const completed = this.tasks?.filter(task => task.completed).length;
        if (total && completed) this.taskRatio?.push(total === 0? 0 : (completed / total));
    }
    
};

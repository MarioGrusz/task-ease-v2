export interface ITask {
    id: string;
    name: string;
    completed: boolean;
    remainingTime: number[]
}

export class Category {
    
    id: string;
    name: string;
    tasks: ITask[]; 
    taskRatio?: number[];

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = []; 
        this.taskRatio = [];
    }

    addTask(task: ITask) {
        this.tasks.push(task);
    }

    deleteTask(taskIdToRemove: string) {
        this.tasks = this.tasks.filter(task => task.id!== taskIdToRemove);
    }

    completeTask(taskId: string) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
        }
    }

    getCompletionRatio(): number {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        return total === 0? 0 : (completed / total);
        //this.taskRatio?.push(total)
    }

    getTaskById(taskId: string): ITask | undefined {
        return this.tasks.find(task => task.id === taskId);
    }
}


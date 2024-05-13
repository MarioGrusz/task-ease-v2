import { ITask } from "../storage/storage";

export class Category {

  id: number | string;
  name: string;
  tasks: ITask[] = [];
  taskRatio?: number[] = [];

  constructor(name: string, tasks: ITask[] = [], taskRatio: number[] = []) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tasks = tasks;
    this.taskRatio = taskRatio;
  }


  getCompletionRatio(): void {
      const total = this.tasks?.length;
      const completed = this.tasks?.filter(task => task.completed).length;
      if(total && completed) this.taskRatio?.push(total === 0 ? 0 : (completed / total))
  }
}


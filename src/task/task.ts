export class Task {

    id: number | string;
    name: string;
    remainingTime: number[] = [];
    completed: boolean;
  
    constructor(name: string, remainigTime: number[] = [], completed = false) {
      this.id = crypto.randomUUID();
      this.name = name;
      this.remainingTime = remainigTime;
      this.completed = completed;
    }


}
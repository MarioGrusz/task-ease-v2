// import { Task } from "../task/task";
// const notificationTimeBox = document.querySelector('.notification-time-box ') as HTMLElement;
// const timeBoxForm = document.querySelector('.time-form') as HTMLFormElement;
// const timeBoxValue = document.querySelector('.time-value') as HTMLInputElement;
// const timeBoxCloseBtn = document.querySelector('.btn-close-box') as HTMLButtonElement;

// ///https://www.phind.com/search?cache=pj5mxs86r6von4ftzs76g3ys form ids

// export class Timer {

//     private element: {
//         minutes: HTMLElement;
//         seconds: HTMLElement;
//         control: HTMLElement;
//         reset: HTMLElement;
//     };

//     private categoryId: string | undefined;
//     private taskId: string | undefined;
//     interval: number;
//     remainingSeconds: number;

//     constructor(container: HTMLElement, task: Task) {
//         container.innerHTML = Timer.getHTML();

//         this.element = {
//             minutes: container.querySelector('.timer__part--minutes')!,
//             seconds: container.querySelector('.timer__part--seconds')!,
//             control: container.querySelector('.timer__btn--control')!,
//             reset: container.querySelector('.timer__btn--reset')!,
//         };

//         this.interval = 0;
//         this.remainingSeconds = task.remainingTime;

//         this.setupListeners();
//         this.updateInterfaceTime();
//     }

//     private setupListeners() {
        
//         this.element.reset.addEventListener('click', (event :Event) => {
//             this.getIds(event);
//             notificationTimeBox.style.display = 'flex';
//         });
               

//         timeBoxCloseBtn.addEventListener('click', () => {
//             notificationTimeBox.style.display = 'none';
//         });

//         timeBoxForm.addEventListener('submit', (event: Event) => {
//             event.preventDefault();
//             let input = Number(timeBoxValue.value);
//             if(this.categoryId && this.taskId) Task.updateRemainingTime(this.categoryId, this.taskId, input)
//             const newSec = this.getRemainingTime();
//             if(newSec!== undefined) this.remainingSeconds = newSec; 
//             this.updateInterfaceTime()

//             timeBoxValue.value = '';
          
//         });
//     }


//     private getRemainingTime () {
//         let selectedTask;
//         if(this.categoryId && this.taskId) selectedTask = Task.findTaskById(this.categoryId, this.taskId)
//         return selectedTask?.remainingTime;
//     }


//     private getIds(event: Event) {
//         const targetElement = event.target as HTMLElement;
//         const categoryItem = targetElement.closest('.category-box');
//         const categoryId = categoryItem ? this.getCategoryItemId(categoryItem): '';
//         const taskItem = targetElement.closest('.task-item');
//         const taskId = taskItem ? this.getTaskId(taskItem) : '';

//         this.categoryId = categoryId;
//         this.taskId = taskId;

//         console.log({ categoryId, taskId });
//     }

//     private getCategoryItemId(categoryItem?: Element): string {
//         return categoryItem? categoryItem.getAttribute('id') || '' : '';
//     }

//     private getTaskId(taskItem?: Element): string | undefined {
//         if (!taskItem) return undefined;
//         const taskIdInput = taskItem.querySelector('.task-first > input') as HTMLInputElement;
//         return taskIdInput? taskIdInput.id : undefined;
//     }

//     updateInterfaceTime() {
//         const minutes = Math.floor(this.remainingSeconds / 60);
//         const seconds = this.remainingSeconds % 60;
    
//         this.element.minutes.textContent = minutes.toString().padStart(2, '0');
//         this.element.seconds.textContent = seconds.toString().padStart(2, '0');

//     }

//     static getHTML(): string {
//         return `
//         <span class="timer__part timer__part--minutes">00</span>
//         <span class="timer__part timer__part--semicolons">:</span>
//         <span class="timer__part timer__part--seconds">00</span>

//         <button
//             type="button"
//             class="timer__btn timer__btn--control timer__start"
//         >
//             <p>play</p>
//         </button>

//         <button
//             type="button"
//             class="timer__btn timer__btn--reset timer__setup"
//         >
//             <p>setup</p>
//         </button>
//         `;
//     }

// }

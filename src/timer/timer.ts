import { Task } from "../task/task";
const notificationTimeBox = document.querySelector('.notification-time-box ') as HTMLElement;
const timeBoxForm = document.querySelector('.time-form') as HTMLFormElement;
const timeBoxValue = document.querySelector('.time-value') as HTMLInputElement;
const timeBoxCloseBtn = document.querySelector('.btn-close-box') as HTMLButtonElement;


//TIMER CLASS IS'T FINISHED YET, FIRST I HAVE TO FIGURE OUT HOW TO 
//PASS INPUT FROM TIMEBOX FORM TO TARGET TIMER
//I HAVE ONE FORM FOR ALL INPUTS

//SIDENOTE: I CAN GET CATEGORY ID AND TAKS ID (EACH TASK HAS TIMER)
//BY CLICKING SETUP/REST BUTTON
//this.element.reset (parents)



timeBoxForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const input = Number(timeBoxValue.value);
    console.log('INPUT', input)
    timeBoxValue.value = '';
  
});


export class Timer {

    private element: {
        minutes: HTMLElement;
        seconds: HTMLElement;
        control: HTMLElement;
        reset: HTMLElement;
    };

    interval: number;
    remainingSeconds: number;
    parentCategoryId: string;
    taskId: string;
    task: Task | undefined;

    constructor(container: HTMLElement, task: Task, parentCategoryId: string, taskId : string) {
        container.innerHTML = Timer.getHTML();

        this.element = {
            minutes: container.querySelector('.timer__part--minutes')!,
            seconds: container.querySelector('.timer__part--seconds')!,
            control: container.querySelector('.timer__btn--control')!,
            reset: container.querySelector('.timer__btn--reset')!,
        };
        this.parentCategoryId = parentCategoryId
        this.taskId = taskId;
        this.interval = 0;
        this.remainingSeconds = task.remainingTime;

        this.setupListeners();
        this.updateInterfaceTime();
    }

    private setupListeners() {
        
        this.element.reset.addEventListener('click', () => {

            notificationTimeBox.style.display = 'flex';
        });
               

        timeBoxCloseBtn.addEventListener('click', () => {
            notificationTimeBox.style.display = 'none';
        });

       
    }


    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
    
        this.element.minutes.textContent = minutes.toString().padStart(2, '0');
        this.element.seconds.textContent = seconds.toString().padStart(2, '0');

    }

    static getHTML(): string {
        return `
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part timer__part--semicolons">:</span>
        <span class="timer__part timer__part--seconds">00</span>

        <button
            type="button"
            class="timer__btn timer__btn--control timer__start"
        >
            <p>play</p>
        </button>

        <button
            type="button"
            class="timer__btn timer__btn--reset timer__setup"
        >
            <p>setup</p>
        </button>
        `;
    }

}

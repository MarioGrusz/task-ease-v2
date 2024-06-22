import { Task } from "../task/task";
const notificationTimeBox = document.querySelector(
  ".notification-time-box "
) as HTMLElement;
const timeBoxForm = document.querySelector(".time-form") as HTMLFormElement;
const timeBoxCloseBtn = document.querySelector(
  ".btn-close-box"
) as HTMLButtonElement;

timeBoxForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  Task.updateRemainingTime(
    (form[0] as HTMLInputElement).value,
    (form[1] as HTMLInputElement).value,
    +(form[2] as HTMLInputElement).value
  );
  console.log("INPUT", (form[2] as HTMLInputElement).value); //remove
  (form[2] as HTMLInputElement).value = "";
});

export class Timer {
  private element: {
    minutes: HTMLElement;
    seconds: HTMLElement;
    start_stop_btn: HTMLElement;
    setup_reset_btn: HTMLElement;
  };

  interval: ReturnType<typeof setInterval> | number;
  remainingSeconds: number; // fix it later
  parentCategoryId: string;
  taskId: string;
  task: Task | undefined;

  constructor(
    container: HTMLElement,
    task: Task,
    parentCategoryId: string,
    taskId: string
  ) {
    container.innerHTML = Timer.getHTML();

    this.element = {
      minutes: container.querySelector(".timer__part--minutes")!,
      seconds: container.querySelector(".timer__part--seconds")!,
      start_stop_btn: container.querySelector(".timer__btn--control")!,
      setup_reset_btn: container.querySelector(".timer__btn--reset")!,
    };
    this.parentCategoryId = parentCategoryId;
    this.taskId = taskId;
    this.interval = 0;
    this.remainingSeconds = task.remainingTime;

    this.setupListeners();
    this.updateInterfaceTime();
  }

  private setupListeners() {
    this.element.setup_reset_btn.addEventListener("click", () => {
      notificationTimeBox.style.display = "flex";
      (document.getElementById("category-id") as HTMLInputElement).value =
        this.parentCategoryId;
      (document.getElementById("task-id") as HTMLInputElement).value =
        this.taskId;
    });

    timeBoxCloseBtn.addEventListener("click", () => {
      notificationTimeBox.style.display = "none";
      timeBoxForm.reset();
    });

    this.element.start_stop_btn.addEventListener("click", () => {
      console.log("START", this.remainingSeconds);
      if (this.interval === 0) {
        this.start();
      } else {
        this.stop();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.element.minutes.textContent = minutes.toString().padStart(2, "0");
    this.element.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateInterfaceTime();

        if (this.remainingSeconds === 0) {
          this.stop();
        }
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = 0;
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

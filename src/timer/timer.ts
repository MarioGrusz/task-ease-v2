import { Task } from "../task/task";
const notificationTimeBox = document.querySelector(
  ".notification-time-box "
) as HTMLElement;
const timeBoxForm = document.querySelector(".time-form") as HTMLFormElement;
const timeBoxCloseBtn = document.querySelector(
  ".btn-close-box"
) as HTMLButtonElement;

if (timeBoxForm) {
  timeBoxForm.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const categoryId = (form[0] as HTMLInputElement).value;
    const taskId = (form[1] as HTMLInputElement).value;
    let remainingSecondsInput = form[2] as HTMLInputElement;

    const remainingSeconds = Number(remainingSecondsInput.value);

    if (isNaN(remainingSeconds)) {
      console.error("The remaining seconds value must be a number.");
      alert("Please enter a valid number for remaining seconds.");
      return;
    }

    Task.updateRemainingTime(categoryId, taskId, remainingSeconds);
    remainingSecondsInput.value = "";
    Task.toggleCompleted(categoryId, taskId, false);
    Task.updateCheckBoxUi((form[1] as HTMLInputElement).value, false);
    notificationTimeBox.style.display = "none";
  });
}

export class Timer {
  private element: {
    minutes: HTMLElement;
    seconds: HTMLElement;
    start_stop_btn: HTMLElement;
    setup_reset_btn: HTMLElement;
  };

  interval: ReturnType<typeof setInterval> | number;
  remainingSeconds: number;
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

  private setupListeners(): void {
    this.element.setup_reset_btn.addEventListener("click", () => {
      notificationTimeBox.style.display = "flex";
      (document.getElementById("category-id") as HTMLInputElement).value =
        this.parentCategoryId;
      (document.getElementById("task-id") as HTMLInputElement).value =
        this.taskId;
    });

    timeBoxCloseBtn.addEventListener("click", () => {
      Timer.closeInputForm();
    });

    this.element.start_stop_btn.addEventListener("click", () => {
      if (this.interval === 0) {
        this.start();
      } else {
        this.stop();
      }
    });
  }

  static closeInputForm = () => {
    notificationTimeBox.style.display = "none";
    timeBoxForm.reset();
  };

  updateInterfaceTime(): void {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.element.minutes.textContent = minutes.toString().padStart(2, "0");
    this.element.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  start(): void {
    const newTime = Task.getRemainingTime(this.parentCategoryId, this.taskId);
    if (newTime) this.remainingSeconds = newTime;
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

  stop(): void {
    Task.updateRemainingTime(
      this.parentCategoryId,
      this.taskId,
      this.remainingSeconds
    );
    Task.toggleCompleted(this.parentCategoryId, this.taskId, true);
    Task.updateCheckBoxUi(this.taskId, true);
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

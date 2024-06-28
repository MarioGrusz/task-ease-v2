import { Storage } from "../storage/storage";
import { generateUniqueId, validateId } from "../utils/utils";

export class Task {
  name: string;
  parentCategoryId: string = "";
  id?: string;
  remainingTime: number = 0;
  completed: boolean = false;

  constructor(
    name: string,
    parentCategoryId?: string,
    remainingTime?: number,
    completed?: boolean
  ) {
    this.name = name;
    this.parentCategoryId = parentCategoryId || "";
    this.id = generateUniqueId();
    this.remainingTime = remainingTime || 0;
    this.completed = completed || false;
  }

  static findTaskById(categoryId: string, taskId: string) {
    if (!validateId(categoryId)) throw new Error("Invalid ID type");
    if (!validateId(taskId)) throw new Error("Invalid ID type");
    const categoryArray = Storage.getStorage();
    const category = categoryArray.find(
      (category) => category.id === categoryId
    );
    return category?.tasks.find((task) => task.id === taskId);
  }

  static toggleCompleted(
    categoryId: string,
    taskId: string,
    newCompletedStatus: boolean
  ) {
    if (!validateId(categoryId)) throw new Error("Invalid ID type");
    if (!validateId(taskId)) throw new Error("Invalid ID type");
    let categoryArray = Storage.getStorage();
    const category = categoryArray.find(
      (category) => category.id === categoryId
    );

    if (category && taskId) {
      const taskIndex = category.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        category.tasks[taskIndex].completed = newCompletedStatus;
        Storage.setStorage(categoryArray);
        category.calculateCompletionRatio();
      } else {
        console.error(
          `Task with ID ${taskId} not found in category ${categoryId}`
        );
      }
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }

  static updateRemainingTime(
    categoryId: string,
    taskId: string,
    newTime: number
  ) {
    if (!validateId(categoryId)) throw new Error("Invalid ID type");
    if (!validateId(taskId)) throw new Error("Invalid ID type");
    let categoryArray = Storage.getStorage();
    const category = categoryArray.find(
      (category) => category.id === categoryId
    );

    if (category && taskId) {
      const taskIndex = category.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        category.tasks[taskIndex].remainingTime = newTime;
        Storage.setStorage(categoryArray);

        const taskItemEl = document
          .getElementById(taskId)
          ?.closest(".task-item");

        if (taskItemEl) {
          const minutesEl = taskItemEl.querySelector(".timer__part--minutes");
          const secondsEl = taskItemEl.querySelector(".timer__part--seconds");
          if (minutesEl) {
            minutesEl.innerHTML = Math.floor(newTime / 60)
              .toString()
              .padStart(2, "0");
          }

          if (secondsEl) {
            secondsEl.innerHTML = Math.floor(newTime % 60)
              .toString()
              .padStart(2, "0");
          }
        }
      } else {
        console.error(
          `Task with ID ${taskId} not found in category ${categoryId}`
        );
      }
    } else {
      console.error(`Category with ID ${categoryId} not found`);
    }
  }

  static getRemainingTime(
    categoryId: string,
    taskId: string
  ): number | undefined {
    if (!validateId(categoryId)) throw new Error("Invalid ID type");
    if (!validateId(taskId)) throw new Error("Invalid ID type");
    const task = this.findTaskById(categoryId, taskId);
    if (task) return task.remainingTime;
  }

  static updateCheckBoxUi(taskId: string, newValue: boolean) {
    const taskElement = document.getElementById(taskId);
    if (!taskElement) {
      console.error(`Task element with ID ${taskId} not found.`);
      return;
    }
    const checkboxItemEl = taskElement.closest(
      "input"
    ) as HTMLInputElement | null;
    if (checkboxItemEl) {
      checkboxItemEl.checked = newValue;
      console.log(`Task ${taskId} is marked as completed.`);
    } else {
      console.error(`Checkbox input for task ${taskId} not found.`);
    }
  }
}

import { Category } from "./category";
import { Storage } from "../storage/storage";
import { updateCategoryCounter } from "../utils/utils";
import { renderTask } from "../task/taskRenderer";
import { Task } from "../task/task";
import { validateTask } from "../task/task.zod";
import { ProgressBar } from "../progressBar/progressBar";

let taskRatio: number = 0;
export const categoriesProgressBars = new Map();

export const renderCategory = (
  container: HTMLElement,
  categories: Category[]
) => {
  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    const categoryItem = createCategoryItem(category);
    fragment.appendChild(categoryItem);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
};

const createCategoryItem = (category: Category): HTMLElement => {
  const categoryWrapper = document.createElement("div");
  categoryWrapper.classList.add("category-wrapper");

  const categoryItem = document.createElement("li");
  categoryItem.classList.add("category-box", "glassmorphism-card");
  categoryItem.id = category.id.toString();
  categoryWrapper.appendChild(categoryItem);

  const categoryItemTask = document.createElement("div");
  categoryItemTask.classList.add("category-box__task");
  categoryItemTask.innerHTML = `<input class="category-box__name" type="text" value="${category.name}" readonly>`;
  categoryItem.appendChild(categoryItemTask);

  const btnContainer = createButtonContainer(category, categoryItem);
  categoryItem.appendChild(btnContainer);

  const tasksCounter = createTasksCounter();
  categoryItem.appendChild(tasksCounter);

  const progressBar = createProgressBar(category);
  categoryItem.appendChild(progressBar);

  categoriesProgressBars.set(category.id, {
    progressBarValue: progressBar.querySelector(".progress-bar-value"),
    progressBarFill: progressBar.querySelector(".progress-bar-fill"),
  });

  const taskElementsContainer = createTaskElementsContainer(category);
  categoryItem.appendChild(taskElementsContainer);

  return categoryWrapper;
};

const createTasksCounter = (): HTMLElement => {
  const tasksCounter = document.createElement("p");
  tasksCounter.classList.add("tasks-counter");
  tasksCounter.innerHTML = "Click Open and add task/s";
  return tasksCounter;
};

const createProgressBar = (category: Category): HTMLElement => {
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");

  const progressBarValue = document.createElement("div");
  progressBarValue.classList.add("progress-bar-value");
  progressBar.appendChild(progressBarValue);

  const progressBarFill = document.createElement("div");
  progressBarFill.classList.add("progress-bar-fill");
  progressBar.appendChild(progressBarFill);

  const categoryForProgressBar = Category.findCategoryById(category.id);
  taskRatio = categoryForProgressBar?.taskRatio!;

  new ProgressBar(taskRatio, progressBarValue, progressBarFill);

  return progressBar;
};

const updateProgressBarUI = (category: Category, taskRatio: number) => {
  const progressBarElements = categoriesProgressBars.get(category.id);
  if (progressBarElements) {
    const { progressBarValue, progressBarFill } = progressBarElements;
    const progressBarInstance = new ProgressBar(
      taskRatio,
      progressBarValue,
      progressBarFill
    );
    progressBarInstance.update();
  }
};

const createTaskElementsContainer = (category: Category): HTMLElement => {
  const taskElementsContainer = document.createElement("div");
  taskElementsContainer.classList.add("task-elements-container");

  const form = document.createElement("form");
  form.classList.add("new-task-form");

  form.innerHTML = `
      <input class="task-input" type="text" placeholder="Add task..." />
      <input class="create-task-btn" type="submit" value="Create task" />
    `;

  const tasksWrapper = document.createElement("div");
  tasksWrapper.classList.add("tasks-wrapper");

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const inputElement = form.querySelector(".task-input");
    if (!inputElement) {
      console.error("Task input element not found!");
      return;
    }
    let inputValue = (inputElement as HTMLInputElement)?.value ?? "";
    if (inputValue == null || inputValue.trim() === "") return;
    addTask(inputValue, category, tasksWrapper);
    (inputElement as HTMLInputElement).value = "";
  });

  taskElementsContainer.appendChild(form);
  taskElementsContainer.appendChild(tasksWrapper);

  const categoryToRender = Category.findCategoryById(category.id);
  if (categoryToRender) renderTask(tasksWrapper, categoryToRender);

  return taskElementsContainer;
};

const addTask = (
  inputValue: string,
  category: Category,
  tasksWrapper: HTMLElement
) => {
  const task = new Task(inputValue, category.id);

  const validationResult = validateTask(task);
  if (!validationResult.success) {
    console.error(validationResult.error);
    return;
  }
  category.addTasks(category.id, task);
  const categoryToRender = Category.findCategoryById(category.id);
  taskRatio = categoryToRender?.taskRatio!;
  if (categoryToRender) {
    renderTask(tasksWrapper, categoryToRender);
    updateProgressBarUI(categoryToRender, taskRatio);
  }
};

const createButtonContainer = (
  category: Category,
  categoryItem: HTMLElement
): HTMLElement => {
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const editBtn = createButton("edit-btn", "fas fa-edit", () =>
    editItem(categoryItem, category)
  );
  const deleteBtn = createButton("delete-btn", "fas fa-trash", () =>
    deleteItem(categoryItem, category)
  );
  const openBtn = createButton("button-open", "", () =>
    toggleAccordion(categoryItem)
  );

  openBtn.innerText = "OPEN";
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(openBtn);

  return btnContainer;
};

const createButton = (
  className: string,
  iconClass: string,
  onClick: (event: MouseEvent) => void
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerHTML = `<i class="${iconClass}"></i>`;
  button.addEventListener("click", onClick);
  return button;
};

const deleteItem = (categoryItem: HTMLElement, category: Category) => {
  Category.removeCategory(category.id.toString());
  const categories = Storage.getStorage();
  updateCategoryCounter(categories);
  renderCategory(
    categoryItem.parentElement?.parentElement as HTMLElement,
    categories
  );
};

const editItem = (categoryItem: HTMLElement, category: Category) => {
  const input = categoryItem.querySelector(
    ".category-box__name"
  ) as HTMLInputElement;
  input.removeAttribute("readonly");
  input.focus();
  input.value = input.value;
  input.selectionStart = input.value.length;
  input.selectionEnd = input.value.length;

  input.addEventListener(
    "blur",
    () => {
      input.setAttribute("readonly", "true");
      category.name = input.value;
      Storage.setStorage(
        Storage.getStorage().map((cat) =>
          cat.id === category.id ? category : cat
        )
      );
    },
    { once: true }
  );
};

const toggleAccordion = (categoryItem: HTMLElement) => {
  categoryItem.classList.toggle("active");
  const taskElementsContainer = categoryItem.querySelector(
    ".task-elements-container"
  ) as HTMLElement;
  const openButton = categoryItem.querySelector(
    ".button-open"
  ) as HTMLButtonElement;
  const progressBar = categoryItem.querySelector(
    ".progress-bar"
  ) as HTMLElement;
  const taskInstruction = categoryItem.querySelector(
    "p"
  ) as HTMLParagraphElement;

  taskElementsContainer.style.display = categoryItem.classList.contains(
    "active"
  )
    ? "flex"
    : "none";
  openButton.innerText = categoryItem.classList.contains("active")
    ? "CLOSE"
    : "OPEN";
  progressBar.style.display = categoryItem.classList.contains("active")
    ? "block"
    : "none";
  taskInstruction.style.visibility = categoryItem.classList.contains("active")
    ? "hidden"
    : "visible";
};

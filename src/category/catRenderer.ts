import { Category } from "./category";
import { Storage } from "../storage/storage";
import { updateCategoryCounter } from "../utils/utils";
import { renderTask } from "../task/taskRenderer";
import { Task } from "../task/task";
import { validateTask } from "../task/task.zod";

export const renderCategory = (
  container: HTMLElement,
  categories: Category[]
) => {
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";
  categories.forEach((category) => {
    const categoryItem = createCategoryItem(category);
    fragment.appendChild(categoryItem);

    const taskElementsContainer = createTaskElementsContainer(
      category,
      container,
      categories
    );
    const taskWrapper = taskElementsContainer.querySelector(
      ".tasks-wrapper"
    ) as HTMLElement;

    renderTask(taskWrapper, category);
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

  const taskNameInput = createTaskNameInput(category.name);
  categoryItem.appendChild(taskNameInput);

  const btnContainer = createButtonContainer(category, categoryItem);
  categoryItem.appendChild(btnContainer);

  categoryWrapper.appendChild(categoryItem);

  //Task counter and progress bar go here

  return categoryWrapper;
};

const createTaskNameInput = (name: string): HTMLElement => {
  const taskNameInput = document.createElement("div");
  taskNameInput.classList.add("category-box__task");
  taskNameInput.innerHTML = `<input class="category-box__name" type="text" value="${name}" readonly>`;
  return taskNameInput;
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

const createTaskElementsContainer = (
  category: Category,
  container: HTMLElement,
  categories: Category[]
): HTMLElement => {
  const taskElementsContainer = document.createElement("div");
  taskElementsContainer.classList.add("task-elements-container");

  const form = createTaskForm(category, container, categories);
  taskElementsContainer.appendChild(form);

  const tasksWrapper = document.createElement("div");
  tasksWrapper.classList.add("tasks-wrapper");
  taskElementsContainer.appendChild(tasksWrapper);

  return taskElementsContainer;
};

const createTaskForm = (
  category: Category,
  container: HTMLElement,
  categories: Category[]
): HTMLElement => {
  const form = document.createElement("form");
  form.classList.add("new-task-form");

  form.innerHTML = `
      <input class="task-input" type="text" placeholder="Add task..." />
      <input class="create-task-btn" type="submit" value="Create task" />
    `;

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    addTask(
      category,
      form.querySelector(".task-input") as HTMLInputElement,
      container
    );
  });

  return form;
};

//************* BUTTON FUNCTIONS ****************

const addTask = (
  category: Category,
  inputField: HTMLInputElement,
  container: HTMLElement
) => {
  const inputValue = inputField?.value.trim();
  if (!inputValue) return;

  const task: Task = {
    parentCategoryId: category.id,
    id: crypto.randomUUID(),
    name: inputValue,
    completed: false,
    remainingTime: 0,
  };

  const validationResult = validateTask(task);
  if (!validationResult.success) {
    console.error(validationResult.error);
    return;
  }

  const updatedCategories = Storage.getStorage();
  updateCategoryCounter(updatedCategories);
  renderCategory(container, updatedCategories);

  inputField.value = "";
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

  console.log(openButton);

  taskElementsContainer.style.display = categoryItem.classList.contains(
    "active"
  )
    ? "flex"
    : "none";
  openButton.innerText = categoryItem.classList.contains("active")
    ? "CLOSE1"
    : "close2";
  progressBar.style.display = categoryItem.classList.contains("active")
    ? "block"
    : "none";
};

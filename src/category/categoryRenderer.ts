import { Storage } from "../storage/storage";
import { Category } from "./category";
import { Task } from "../task/task";
import { updateCategoryCounter } from "../utils/utils";
import { renderTask } from "../task/taskRenderer";
import { validateTask } from "../task/task.zod";

export const renderCategory = (container: HTMLElement, array: Category[]) => {

  container.innerHTML = '';

  array.forEach(item => {

    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('category-wrapper');

    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category-box', 'glassmorphism-card');
    categoryItem.id = item.id.toString();
    categoryWrapper.appendChild(categoryItem);   

    const categoryItemTask = document.createElement('div');
    categoryItemTask.classList.add('category-box__task');
    categoryItemTask.innerHTML = `<input class="category-box__name" type="text" value="${item.name}" readonly>`;
    categoryItem.appendChild(categoryItemTask);

    const editDeleteBtnContainer = document.createElement('div');
    editDeleteBtnContainer.classList.add('btn-container');
    categoryItem.appendChild(editDeleteBtnContainer);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    editDeleteBtnContainer.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    editDeleteBtnContainer.appendChild(deleteBtn);

    const openButton = document.createElement('button');
    openButton.innerHTML = 'OPEN';
    openButton.classList.add('button-open');
    editDeleteBtnContainer.appendChild(openButton);

    deleteBtn.addEventListener('click', deleteItem); //DELETE BUTTON
    editBtn.addEventListener('click', editItem); // EDIT BUTTON

    const tasksCounter = document.createElement('p');
    tasksCounter.classList.add('tasks-counter');
    tasksCounter.innerHTML = "Click Open and add task/s"
    categoryItem.appendChild(tasksCounter);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    categoryItem.appendChild(progressBar);

    const progressBarValue = document.createElement('div');
    progressBarValue.classList.add('progress-bar-value');
    progressBar.appendChild(progressBarValue);

    const progressBarFill = document.createElement('div');
    progressBarFill.classList.add('progress-bar-fill');
    progressBar.appendChild(progressBarFill);

    const taskElementsContainer = document.createElement('div');
    taskElementsContainer.classList.add('task-elements-container');
    taskElementsContainer.innerHTML = `
    <form class="new-task-form">
      <input
        class="task-input"
        type="text"
        placeholder="Add task..."
      />
      <input
        class="create-task-btn"
        type="submit"
        value="Create task"
      />
    </form>` 

    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('tasks-wrapper');
    taskElementsContainer.appendChild(tasksWrapper);

    categoryItem.appendChild(taskElementsContainer);

    container.appendChild(categoryWrapper); 

    function deleteItem(event: MouseEvent) {
      const currentTarget = event.currentTarget as HTMLElement;   
      const parentNode = currentTarget.parentNode?.parentElement;
      
      if (parentNode) {
        const id = parentNode.id;
        Category.removeCategory(id);
        array = Storage.getStorage();
        updateCategoryCounter(array);
        renderCategory(container, array);       
      } else {
        console.error('Grandparent node is null');
      }
    }

    function editItem(event: MouseEvent){
      const currentTarget = event.currentTarget as HTMLElement;   
      const parentNode = currentTarget.parentNode?.parentElement;
      const categoryArray = Storage.getStorage();
      const input: HTMLInputElement = document.querySelector('.category-box__name') as HTMLInputElement;
      let itemIndex: number;

      if(parentNode){
        const id = parentNode.id;
        itemIndex = categoryArray.findIndex(item => item.id === id);
      };

     
      input.removeAttribute('readonly');      
      input.addEventListener('focus', event => {
        if (event.target instanceof HTMLInputElement) {
          const inputElement = event.target as HTMLInputElement;
          const { value } = inputElement;
          if (value) inputElement.setSelectionRange(value.length, value.length);
        }
      });

      input.focus();
      input.addEventListener('blur', (event: Event) => {
        const target = event.target as HTMLInputElement;
        input.setAttribute('readonly', 'true');
        categoryArray[itemIndex].name = target.value;
        Storage.setStorage(categoryArray);
      });
        
    };


    function toggleAccordion() {
      categoryItem.classList.toggle("active");
      taskElementsContainer.style.display = categoryItem.classList.contains('active') ? 'flex' : 'none';
      openButton.innerText = categoryItem.classList.contains('active') ? 'CLOSE' : 'OPEN';
      progressBar.style.display = categoryItem.classList.contains('active') ? 'block' : 'none';
      //categoryItem.classList.contains('active') ? showProgressBar() : undefined;
    }


    //SAVE FULLSCREEN OPTION ON REFRESH
    // if (category.id === selectedCategoryId) { 
    //     //openElment();
    // };

    openButton.addEventListener('click', () => { toggleAccordion() });

    const taskForms = document.querySelectorAll('.new-task-form');

    taskForms.forEach(form =>{
      const inputField = form.querySelector('.task-input') as HTMLInputElement; 

      form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const currentTarget = event.currentTarget as HTMLElement; 
        const parentNode = currentTarget.parentNode?.parentElement;
        const inputValue = inputField?.value; 
        let currentCategoryId: string = '';
        if(parentNode) {
          currentCategoryId = parentNode.id;
        }     
        if (inputValue == null || inputValue.trim() === '') return;
        const taskName = inputValue

        const task: Task = {
          parentCategoryId: categoryItem.id,
          id: crypto.randomUUID(), 
          name: taskName,
          completed: false,
          remainingTime: 0,
        };

        const validationResult = validateTask(task);
        if (!validationResult.success) {
          console.error(validationResult.error);
          return; 
        }
      
        Category.addTasks(currentCategoryId, task);
        item.tasks.push(task);
        renderTask(tasksWrapper, item);
        inputField.value = '';
      });
    })

    renderTask(tasksWrapper, item)
  });

};
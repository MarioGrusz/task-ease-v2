import { Category } from "../category/category";
import { Task } from "./task";
import { Timer } from "../timer/timer";

export const renderTask = (container: HTMLElement, category: Category) => {

    container.innerHTML = "";

    category?.tasks.forEach(task =>{

        let taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
      
        const taskFirst = document.createElement('div');
        taskFirst.classList.add('task-first');
        taskElement.appendChild(taskFirst);

        const checkboxElement = document.createElement('input');
        checkboxElement.classList.add('completed-checkbox');
        checkboxElement.type = 'checkbox';
        checkboxElement.id = task.id;
        checkboxElement.checked = task.completed ?? false;
        taskFirst.appendChild(checkboxElement);
      
        const taskName = document.createElement('p')
        taskName.classList.add('todo-text');
        taskName.innerHTML = `${task.name}`
        taskFirst.appendChild(taskName);
  
        const countDown = document.createElement('div');
        countDown.classList.add('timer-container')
        taskFirst.appendChild(countDown);



        //THIS THE PLACE WHERE I CREATE AN INSTANCE OF TIMER AND APPEND IT TO CONTAINER 'COUTDOWN'
        //BUT I HAVE NO IDEA HOW CAN I PASS REMIANING TIME VALUE TO CERTAIN TIMER
        container.appendChild(taskElement);
        new Timer(countDown, task, task.parentCategoryId, task.id)
    
        checkboxElement.addEventListener('click', (event: Event) => {
            
            const target = event.target as HTMLInputElement;

            if (target) {
                const currentTarget = event.target as HTMLElement;
                const parentNode = currentTarget.parentNode?.parentElement?.parentElement?.parentElement?.parentElement;
                const searchedCategoryId = parentNode?.id;
                const searchedTaskId = currentTarget.id;      
                if(searchedCategoryId && searchedTaskId ){
                    Task.toggleCompleted(searchedCategoryId, searchedTaskId, target.checked)
                };
            }
        });

    });
};
// import { Category } from "../category/category";
// import { Storage } from "../storage/storage";

// export const renderTask = (container: HTMLElement, category: Category) => {

//     container.innerHTML = "";

//     category?.tasks.forEach(task =>{

//         let taskElement = document.createElement('div');
//         taskElement.classList.add('task-item');
      
//         const taskFirst = document.createElement('div');
//         taskFirst.classList.add('task-first');
//         taskElement.appendChild(taskFirst);

//         const checkboxElement = document.createElement('input');
//         checkboxElement.classList.add('completed-checkbox');
//         checkboxElement.type = 'checkbox';
//         checkboxElement.id = task.id;
//         checkboxElement.checked = task.completed ?? false;
//         taskFirst.appendChild(checkboxElement);
      
//         const taskName = document.createElement('p')
//         taskName.classList.add('todo-text');
//         taskName.innerHTML = `${task.name}`
//         taskFirst.appendChild(taskName);
  
//         const countDown = document.createElement('div');
//         countDown.classList.add('timer-container')
//         taskFirst.appendChild(countDown);

//         container.appendChild(taskElement);


//         // checkboxElement.addEventListener('click', (event: Event) => {
//         //     checkboxElement.checked;
//         //     const currentTarget = event.currentTarget as HTMLElement; 
//         //     const parentNode = currentTarget.parentNode?.parentElement?.parentElement?.parentElement?.parentElement;
//         //     const searchedCategoryId = parentNode?.id
//         //     const searchedTaskId = currentTarget.id;
//         //     const categoryArray = Storage.getStorage();
//         //     const selectedCategory = categoryArray.find(category => category.id === searchedCategoryId);
//         //     const selectedTask = selectedCategory?.tasks.find(task => task.id === searchedTaskId);
//         //     console.log(selectedCategory, selectedTask)
//         //     selectedTask?.completed = event.target.checked
    
  
//         // });

//         checkboxElement.addEventListener('click', (event: Event) => {
//             // Check if event.target is not null
//             const target = event.target as HTMLInputElement;
//             if (target) {
//                 const currentTarget = event.target as HTMLElement; // Use event.target directly
//                 const parentNode = currentTarget.parentNode?.parentElement?.parentElement?.parentElement?.parentElement;
//                 const searchedCategoryId = parentNode?.id;
//                 const searchedTaskId = currentTarget.id;
//                 const categoryArray = Storage.getStorage();
//                 const selectedCategory = categoryArray.find(category => category.id === searchedCategoryId);
//                 const selectedTask = selectedCategory?.tasks.find(task => task.id === searchedTaskId);
//                 console.log(selectedCategory, selectedTask);

//                 console.log(target.checked)
//                 if(searchedCategoryId && searchedTaskId )Category.toggleTaskCompleted(searchedCategoryId, searchedTaskId)
    
//                 // Ensure selectedTask is not undefined before accessing its completed property
//                 // if (selectedTask) {
//                 //     selectedTask.completed = target.checked;
//                 //     if(selectedCategory) Storage.updateStorage(selectedCategory)
//                 //     console.log(selectedCategory)
                    
//                 // }

//             }
//         });
        

//     });
// };
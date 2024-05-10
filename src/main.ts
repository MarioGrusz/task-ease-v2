import { leaveWelcomePage, getCurrentDate } from "./utils/utils";
import { Category } from "./category/category";
import { Storage } from "./storage/storage";
import { renderCategory } from "./category/categoryRenderer";




// ****** SELECT ITEMS **********
//Buttons
const nextPageButton = document.querySelector('.welcome-page__btn') as HTMLButtonElement;


//Form
const form = document.getElementById('new-category-form') as HTMLFormElement;
const categoryNameValue = document.getElementById('category-name') as HTMLInputElement;

//Containers
const categoriesContainer = document.querySelector<HTMLElement>('.category-box-container');

//Categories
export let categories = Storage.getStorage();



nextPageButton?.addEventListener('click', leaveWelcomePage);

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    if (categoryNameValue == null || categoryNameValue.value.trim() === '') return;

    const categoryName = categoryNameValue.value;
    const newCategory = new Category(categoryName);
    
    Storage.updateStorage(newCategory);
    categories = Storage.getStorage();
    if(categoriesContainer) renderCategory(categoriesContainer, categories);   
    (event.target as HTMLFormElement).reset();
});


window.addEventListener('DOMContentLoaded', () => {
    if(categoriesContainer)renderCategory(categoriesContainer, categories);
    getCurrentDate();
    
});




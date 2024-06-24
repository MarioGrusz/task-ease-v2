// import {
//   leaveWelcomePage,
//   getCurrentDate,
//   updateCategoryCounter,
// } from "./utils/utils";
// import { Category } from "./category/category";
// import { Storage } from "./storage/storage";
// // import { renderCategory } from "./category/categoryRenderer";
// import { renderCategory } from "./category/categoryRenderer";
// import { validateCategory } from "./category/category.zod";

// // ****** SELECT ITEMS **********
// //Buttons
// const nextPageButton = document.querySelector(
//   ".welcome-page__btn"
// ) as HTMLButtonElement;

// //Form
// const form = document.getElementById("new-category-form") as HTMLFormElement;
// const categoryNameValue = document.getElementById(
//   "category-name"
// ) as HTMLInputElement;

// //Containers
// const categoriesContainer = document.querySelector<HTMLElement>(
//   ".category-box-container"
// );

// //Categories
// export let categories = Storage.getStorage();

// if (nextPageButton) nextPageButton?.addEventListener("click", leaveWelcomePage);

// if (form) {
//   form.addEventListener("submit", (event: Event) => {
//     event.preventDefault();
//     if (categoryNameValue == null || categoryNameValue.value.trim() === "")
//       return;

//     const categoryName = categoryNameValue.value;
//     const category = new Category(categoryName);

//     const validationResult = validateCategory(category);
//     if (!validationResult.success) {
//       console.error(validationResult.error);
//       return;
//     }

//     Category.addCategory(category);
//     categories = Storage.getStorage();
//     updateCategoryCounter(categories);
//     if (categoriesContainer) renderCategory(categoriesContainer, categories);
//     (event.target as HTMLFormElement).reset();
//   });
// }

// window.addEventListener("DOMContentLoaded", () => {
//   if (categories.length !== 0) leaveWelcomePage();
//   updateCategoryCounter(categories);
//   if (categoriesContainer) renderCategory(categoriesContainer, categories);
//   getCurrentDate();
//   console.log("category", categories);
// });

const welcomePage = document.querySelector('.welcome-page__container') as HTMLElement;
const itemsListPage = document.querySelector('.items-container') as HTMLElement;
const displayCurrentDate = document.querySelector('.text-wrapper') as HTMLElement;
const categoriesCounter = document.querySelector('.category-counter') as HTMLElement;
import { Category } from "../category/category";
import { categories } from "../main";


// PAGE TRANSITION
export const leaveWelcomePage = () => {

  if(welcomePage){
    welcomePage.style.transform = "translateX(-100%)";
    welcomePage.addEventListener("transitionend", () => {
        welcomePage.style.display = "none"
    });
    if(categories.length == 0 || categories.length !== 0) {
      if (itemsListPage) {
        itemsListPage.style.transform = "translateX(0)";
        itemsListPage.style.display = "flex";
      }
    
    }
  }   
};


// CURRENT DATE
export const getCurrentDate = () => {
  const date = new Date();
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: `${clientTimeZone}`}).format(date);
  displayCurrentDate.innerHTML = `Today is, ${currentDate}`;
};


//SHOW - UPDATE CATEGORY COUNTER/NUMBER
export const updateCategoryCounter = (categories: Category[]) => {
 
  if (categories.length === 0 ) {
    categoriesCounter.innerText = "You don't have any categories";
  } else {
    const categoryString = categories.length === 1 ? "category" : "categories"
    categoriesCounter.innerText = `You have ${categories.length} ${categoryString}`;
    
  }  
};
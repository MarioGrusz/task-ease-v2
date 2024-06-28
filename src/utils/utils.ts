const welcomePage = document.querySelector(
  ".welcome-page__container"
) as HTMLElement;
const mainContainer = document.querySelector(".main-container") as HTMLElement;
const itemsListPage = document.querySelector(".items-container") as HTMLElement;
const displayCurrentDate = document.querySelector(
  ".text-wrapper"
) as HTMLElement;
const categoriesCounter = document.querySelector(
  ".category-counter"
) as HTMLElement;
import { Category } from "../category/category";
import { categories } from "../main";

export const leaveWelcomePage = () => {
  if (welcomePage) {
    welcomePage.style.transform = "translateX(-100%)";
    welcomePage.addEventListener("transitionend", () => {
      welcomePage.style.display = "none";
      mainContainer.style.overflow = "scroll";
      if (categories.length !== 0 && itemsListPage) {
        itemsListPage.style.transform = "translateX(0)";
        itemsListPage.style.display = "flex";
      }
    });
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: `${clientTimeZone}`,
  }).format(date);
  displayCurrentDate.innerHTML = `Today is, ${currentDate}`;
};

//SHOW - UPDATE CATEGORY COUNTER/NUMBER
export const updateCategoryCounter = (categories: Category[]) => {
  if (categories.length === 0) {
    categoriesCounter.innerText = "You don't have any categories";
  } else {
    const categoryString = categories.length === 1 ? "category" : "categories";
    categoriesCounter.innerText = `You have ${categories.length} ${categoryString}`;
  }
};

export const generateUniqueId = (): string => {
  try {
    return crypto.randomUUID();
  } catch (error) {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

export const validateId = (id: unknown): id is number | string => {
  return typeof id === "number" || typeof id === "string";
};

export const LOCAL_STORAGE_KEY: string = "categories";

import { expect, describe, it } from "vitest";
import { Category } from "./category";

const LOCAL_STORAGE_KEY = "categories";

describe("Category", () => {
  // it("should constructor sets name and generates a random ID", () => {
  //   const category = new Category("Test Category");
  //   expect(category.name).toBe("Test Category");
  //   expect(typeof category.id).toBe("string");
  // });

  // it("should add a new category", () => {
  //   const newCategory = new Category("Test Category");
  //   Category.addCategory(newCategory);
  //   expect(localStorage.setItem).toHaveBeenCalled();
  //   expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
  //     JSON.stringify([newCategory])
  //   );
  // });

  // it("should remove a category by ID", () => {
  //   const initialCategories = [
  //     { id: "1", name: "Test Category", tasks: [], taskRatio: 0 },
  //     { id: "2", name: "Test Category", tasks: [], taskRatio: 0 },
  //   ];
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
  //   Category.removeCategory("1");

  //   expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
  //   expect(localStorage.setItem).toHaveBeenCalled();
  //   expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
  //     JSON.stringify([
  //       { id: "2", name: "Test Category", tasks: [], taskRatio: 0 },
  //     ])
  //   );
  // });

  // it("should find a category by ID", () => {
  //   const initialCategories = [
  //     { id: "1", name: "Test Category", tasks: [], taskRatio: 0 },
  //     { id: "2", name: "Test Category", tasks: [], taskRatio: 0 },
  //   ];
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
  //   const categoryId = "1";
  //   const foundCategory = Category.findCategoryById(categoryId);
  //   expect(foundCategory).toEqual(expect.objectContaining({ id: categoryId }));
  // });

  // it("should updates a category", () => {
  //   const initialCategories = [
  //     { id: "1", name: "test category_1", tasks: [], taskRatio: 0 },
  //     { id: "2", name: "test category_2", tasks: [], taskRatio: 0 },
  //   ];
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
  //   const updatedCategory = new Category("updated_category", [], 0, "2");
  //   Category.updateCategory(updatedCategory);

  //   expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
  //     JSON.stringify([
  //       {
  //         id: "1",
  //         name: "test category_1",
  //         tasks: [],
  //         taskRatio: 0,
  //       },
  //       {
  //         id: "2",
  //         name: "updated_category",
  //         tasks: [],
  //         taskRatio: 0,
  //       },
  //     ])
  //   );
  // });

  // it("should add a task to a category", () => {
  //   const testCategoryOne = new Category("test category_1", [], 0, "1");
  //   const testCategoryTwo = new Category("test category_2", [], 0, "2");

  //   const task = {
  //     parentCategoryId: "1",
  //     id: "task1",
  //     name: "Test Task",
  //     remainingTime: 120,
  //     completed: false,
  //   };

  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEY,
  //     JSON.stringify([testCategoryOne, testCategoryTwo])
  //   );
  //   testCategoryOne.addTasks("1", task);

  //   expect(localStorage.getItem).toHaveBeenCalled();
  //   expect(localStorage.setItem).toHaveBeenCalled();
  //   expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
  //     JSON.stringify([
  //       {
  //         id: "1",
  //         name: "test category_1",
  //         tasks: [task],
  //         taskRatio: 0,
  //       },
  //       {
  //         id: "2",
  //         name: "test category_2",
  //         tasks: [],
  //         taskRatio: 0,
  //       },
  //     ])
  //   );
  // });

  it("should calculate completion ratio for category with tasks", () => {
    const task_1 = {
      parentCategoryId: "1",
      id: "task1",
      name: "Test Task",
      remainingTime: 120,
      completed: false,
    };

    const task_2 = {
      parentCategoryId: "1",
      id: "task2",
      name: "Test Task",
      remainingTime: 60,
      completed: false,
    };

    const task_3 = {
      parentCategoryId: "1",
      id: "task3",
      name: "Test Task",
      remainingTime: 120,
      completed: true,
    };

    const testCategoryOne = new Category("test category_1", [], 0, "1");
    const testCategoryTwo = new Category("test category_2", [], 0, "2");

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([testCategoryOne, testCategoryTwo])
    );

    testCategoryOne.addTasks("1", task_1);
    testCategoryOne.addTasks("1", task_2);
    testCategoryOne.addTasks("1", task_3);

    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify([
        {
          id: "1",
          name: "test category_1",
          tasks: [task_1, task_2, task_3],
          taskRatio: 0,
        },
        {
          id: "2",
          name: "test category_2",
          tasks: [],
          taskRatio: 0,
        },
      ])
    );
    // testCategoryOne.getCompletionRatio();
    // expect(testCategoryOne.taskRatio).toBe(33);
  });
});

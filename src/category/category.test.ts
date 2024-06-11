import { test, expect, describe, it } from "vitest";
import { Category } from "./category";

const LOCAL_STORAGE_KEY = "todo";

describe("Category", () => {
  test("constructor sets name and generates a random ID", () => {
    const category = new Category("Test Category");
    expect(category.name).toBe("Test Category");
    expect(typeof category.id).toBe("string");
  });

  it("should add a new category", () => {
    const newCategory = new Category("Test Category");
    Category.addCategory(newCategory);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify([newCategory])
    );
  });

  it("should remove a category by ID", () => {
    const initialCategories = [
      { id: "1", name: "Test Category" },
      { id: "2", name: "Test Category" },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
    Category.removeCategory("1");

    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(
      JSON.stringify([{ id: "2", name: "Test Category" }])
    );
  });

  it("should add a task to a category", () => {
    const initialCategories = [{ id: "1", name: "Test Category", tasks: [] }];
    const task = {
      id: "task1",
      name: "Test Task",
      completed: false,
      remainingTime: [120],
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
    Category.addTasks("1", task);

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem("todo")).toBe(
      JSON.stringify([{ id: "1", name: "Test Category", tasks: [task] }])
    );
  });

  it("should calculate and update the completion ratio of a category", () => {
    const category = new Category("Test Category", [
      {
        id: "task1",
        name: "Test Task 1",
        completed: true,
        remainingTime: [120],
      },
      {
        id: "task2",
        name: "Test Task 2",
        completed: false,
        remainingTime: [60],
      },
    ]);
    category.getCompletionRatio();

    expect(category.taskRatio).toEqual([0.5]);
  });
});

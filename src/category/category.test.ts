import { expect, describe, it, beforeEach } from "vitest";
import { Category } from "./category";
import { LOCAL_STORAGE_KEY } from "../utils/utils";

const task1 = {
  parentCategoryId: "1",
  id: "task1",
  name: "Task 1",
  remainingTime: 120,
  completed: false,
};
const task2 = {
  parentCategoryId: "1",
  id: "task2",
  name: "Task 2",
  remainingTime: 60,
  completed: true,
};

describe("Category", () => {
  beforeEach(() => {
    const initialCategories = [
      { id: "1", name: "test_category_1", tasks: [], taskRatio: 0 },
      { id: "2", name: "test_category_2", tasks: [], taskRatio: 0 },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
  });

  it("should constructor set name and generate a random ID", () => {
    const category = new Category("new_category");
    expect(category.name).toBe("new_category");
    expect(typeof category.id).toBe("string");
  });

  it("should add a new category", () => {
    const newCategory = new Category("new_category");
    Category.addCategory(newCategory);
    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    expect(storedCategories).toContainEqual({
      id: newCategory.id,
      name: newCategory.name,
      tasks: [],
      taskRatio: 0,
    });
  });

  it("should remove a category by ID", () => {
    const categoryIdToRemove = "1";
    Category.removeCategory(categoryIdToRemove);
    const remainingCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    expect(remainingCategories).not.toContainEqual({ id: categoryIdToRemove });
  });

  it("should find a category by ID", () => {
    const categoryIdToFind = "2";
    const foundCategory = Category.findCategoryById(categoryIdToFind);
    expect(foundCategory).toEqual({
      id: categoryIdToFind,
      name: "test_category_2",
      tasks: [],
      taskRatio: 0,
    });
  });

  it("should update a category", () => {
    const updatedCategory = new Category("Updated Category", [], 0, "1");
    Category.updateCategory(updatedCategory);
    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    const updatedStoredCategory = storedCategories.find(
      (cat: any) => cat.id === updatedCategory.id
    );
    expect(updatedStoredCategory).toEqual({
      id: "1",
      name: "Updated Category",
      tasks: [],
      taskRatio: 0,
    });
  });

  it("should add tasks to a category", () => {
    const testCategory = new Category("test_category_3", [], 0, "20");
    Category.addCategory(testCategory);

    testCategory.addTasks("20", task1);
    testCategory.addTasks("20", task2);

    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    const updatedCategory = storedCategories.find(
      (cat: any) => cat.id === "20"
    );
    expect(updatedCategory.tasks).toEqual([task1, task2]);
  });

  it("should calculate completion ratio for category with tasks", () => {
    const testCategory = new Category("test_category_4", [], 0, "20");
    Category.addCategory(testCategory);
    testCategory.addTasks("20", task1);
    testCategory.addTasks("20", task2);

    testCategory.calculateCompletionRatio();
    const updatedCategory = Category.findCategoryById("20");
    expect(updatedCategory?.taskRatio).toBe(50);
  });

  it("should handle edge case when finding a non-existing category", () => {
    const foundCategory = Category.findCategoryById("nonexistent_id");
    expect(foundCategory).toBeUndefined();
  });

  it("should handle edge case when updating a non-existing category", () => {
    const nonExistingCategory = new Category(
      "Non-existing Category",
      [],
      0,
      "nonexistent_id"
    );

    Category.updateCategory(nonExistingCategory);
    const storedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    expect(storedCategories).toHaveLength(2);
  });
});

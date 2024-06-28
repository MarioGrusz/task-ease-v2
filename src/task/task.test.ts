import { describe, expect, it, beforeEach } from "vitest";
import { Task } from "./task";
import { Category } from "../category/category";
import { LOCAL_STORAGE_KEY } from "../utils/utils";

const task1 = {
  id: "task1",
  name: "task_one",
  parentCategoryId: "1",
  remainingTime: 60,
  completed: false,
};
const task2 = {
  id: "task2",
  name: "task_two",
  parentCategoryId: "1",
  remainingTime: 120,
  completed: false,
};
const task3 = {
  id: "task3",
  name: "task_three",
  parentCategoryId: "1",
  remainingTime: 120,
  completed: false,
};

describe("task", () => {
  beforeEach(() => {
    const initialCategories = [
      {
        id: "1",
        name: "test_category_1",
        tasks: [task1, task2, task3],
        taskRatio: 0,
      },
      { id: "2", name: "test_category_2", tasks: [], taskRatio: 0 },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCategories));
  });

  it("should creates a task object with expected properties", () => {
    const name = "test_task";
    const parentCategoryId = "1";
    const remainingTime = 20;
    const completed = false;
    const task = new Task(name, parentCategoryId, remainingTime, completed);

    expect(task.name).toBe(name);
    expect(task.parentCategoryId).toBe(parentCategoryId);
  });

  it("should generate a valid unique ID", () => {
    const task = new Task("test_task");
    const id = task.id;

    expect(typeof id).toBe("string" || "number");
  });

  it("should find task by valid unique ID", () => {
    const task = {
      parentCategoryId: "20",
      id: "task1",
      name: "test_task",
      remainingTime: 120,
      completed: false,
    };
    const testCategory = new Category("test_category_3", [task], 0, "20");
    Category.addCategory(testCategory);
    testCategory.addTasks("20", task);
    const foundTask = Task.findTaskById("20", "task1");

    expect(foundTask).toEqual(expect.objectContaining(task));
  });

  it("should toggle task completed status", () => {
    const categoryId = "1";
    const taskId = "task1";
    const newCompletedStatus = true;

    Task.toggleCompleted(categoryId, taskId, newCompletedStatus);

    const updatedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    const updatedTask = updatedCategories
      .find((cat: any) => cat.id === categoryId)
      ?.tasks.find((task: any) => task.id === taskId);

    expect(updatedTask?.completed).toBe(newCompletedStatus);
  });

  it("should update remaining time for a task", () => {
    const categoryId = "1";
    const taskId = "task1";
    const newTime = 30;

    Task.updateRemainingTime(categoryId, taskId, newTime);

    const updatedCategories = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)!
    );
    const updatedTask = updatedCategories
      .find((cat: any) => cat.id === categoryId)
      ?.tasks.find((task: any) => task.id === taskId);

    expect(updatedTask?.remainingTime).toBe(newTime);
  });

  it("should get remaining time for a task", () => {
    const categoryId = "1";
    const taskId = "task1";

    const remainingTime = Task.getRemainingTime(categoryId, taskId);

    expect(remainingTime).toBe(60);
  });
});

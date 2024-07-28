import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.locator(".welcome-page__btn");
  const isVisible = await button.isVisible();

  if (isVisible) {
    await button.click();
  }

  await page.click(".round-plus");

  await page.fill("#category-name", "New Category");
  await page.focus("#category-name");
  await page.keyboard.press("Enter");
  await page.click(".fa-circle-xmark");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("adds category UI", async ({ page }) => {
  const categories = await page.locator(".category-wrapper");
  const count = await categories.count();
  expect(count).toBe(1);
});

test("removes category", async ({ page }) => {
  await page.click(".delete-btn");
  const categoriesContainer = await page.locator(".category-box-container");
  const hasNoChildren = await categoriesContainer.evaluate(
    (node) => node.children.length === 0
  );
  expect(hasNoChildren).toBe(true);
});

test("edits category name", async ({ page }) => {
  await page.click(".edit-btn");

  await page.fill(".category-box__name", "");
  await page.fill(".category-box__name", "edited name");
});

test("open close category window", async ({ page }) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();
  const categoryBox = openButton.locator("..").locator("..");
  await expect(categoryBox).toHaveClass(/active/);

  await openButton.click();
  await expect(categoryBox).not.toHaveClass(/active/);
});

test("add task UI inside a category", async ({ page }) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task");
  await page.keyboard.press("Enter");

  const tasks = await page.locator(".tasks-wrapper");
  const count = await tasks.count();
  expect(count).toBe(1);
});

test("visual update of checkbox and progress bar visual ratio", async ({
  page,
}) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task_1");
  await page.keyboard.press("Enter");

  await page.fill(".task-input", "Sample Task_2");
  await page.keyboard.press("Enter");

  const firstTask = await page.locator(".task-item").first();
  const checkbox = await firstTask.locator('input[type="checkbox"]');
  await checkbox.check();
  const afterContent = await checkbox.evaluate((el) => {
    const styles = window.getComputedStyle(el, "::after");
    return styles.content;
  });
  expect(afterContent).toBe('"✔"');

  const progressBar = await page.locator(".progress-bar-fill");
  const progressWidth = await progressBar.evaluate((el) => el.style.width);
  console.log(`Progress bar width: ${progressWidth}`);
  expect(progressWidth).toBe("50%");
});

test("visual update of timer", async ({ page }) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task_1");
  await page.keyboard.press("Enter");

  await page.click(".timer__setup");
  await page.fill("#time-value", "1");
  await page.keyboard.press("Enter");

  const minutes = await page.locator(".timer__part--minutes");
  const minutesInnerText = await minutes.evaluate((el) => el.innerHTML);
  const seconds = await page.locator(".timer__part--seconds");
  const secondsInnerText = await seconds.evaluate((el) => el.innerHTML);
  expect(minutesInnerText).toContain("01");
  expect(secondsInnerText).toContain("00");
});

test("visual update of timer after few sec of work", async ({ page }) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task_1");
  await page.keyboard.press("Enter");

  await page.click(".timer__setup");
  await page.fill("#time-value", "1");
  await page.keyboard.press("Enter");

  await page.click(".timer__start");
  await page.waitForTimeout(3000);
  await page.click(".timer__start");

  const minutes = await page.locator(".timer__part--minutes");
  const minutesInnerText = await minutes.evaluate((el) => el.innerHTML);
  const seconds = await page.locator(".timer__part--seconds");
  const secondsInnerText = await seconds.evaluate((el) => el.innerHTML);
  expect(minutesInnerText).toContain("00");
  expect(secondsInnerText).toMatch(/56|57|58/);
});

test("visual update of start/pause button UI", async ({ page }) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task_1");
  await page.keyboard.press("Enter");

  await page.click(".timer__setup");
  await page.fill("#time-value", "1");
  await page.keyboard.press("Enter");

  const startButton = await page.locator(".timer__start");
  const buttonText = await startButton.locator(":scope > *:first-child");
  await startButton.click();
  await page.waitForTimeout(3000);

  const initialText = await buttonText.textContent();
  await startButton.click();
  await page.waitForTimeout(3000);
  const updatedText = await buttonText.textContent();

  expect(initialText).toContain("pause");
  expect(updatedText).toContain("play");
});

test("visual update progressBar and checkbox after timer reached zero", async ({
  page,
}) => {
  const openButton = await page.locator(".button-open");
  await openButton.click();

  await page.fill(".task-input", "Sample Task_1");
  await page.keyboard.press("Enter");

  await page.click(".timer__setup");
  await page.fill("#time-value", "0.6");
  await page.keyboard.press("Enter");

  const startButton = await page.locator(".timer__start");
  await startButton.click();
  await page.waitForTimeout(6000);

  const firstTask = await page.locator(".task-item").first();
  const checkbox = await firstTask.locator('input[type="checkbox"]');
  await checkbox.check();
  const afterContent = await checkbox.evaluate((el) => {
    const styles = window.getComputedStyle(el, "::after");
    return styles.content;
  });
  expect(afterContent).toBe('"✔"');

  const progressBar = await page.locator(".progress-bar-fill");
  const progressWidth = await progressBar.evaluate((el) => el.style.width);
  console.log(`Progress bar width: ${progressWidth}`);
  expect(progressWidth).toBe("100%");
});

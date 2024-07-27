import { test, expect } from "@playwright/test";

test("adds category UI", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.locator(".welcome-page__btn");
  const isVisible = await button.isVisible();

  if (isVisible) await button.click();
  await page.click(".round-plus");

  await page.fill("#category-name", "New Category");
  await page.focus("#category-name");
  await page.keyboard.press("Enter");

  const categories = await page.locator(".category-wrapper");
  const count = await categories.count();
  expect(count).toBe(1);
});

test("removes category", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.locator(".welcome-page__btn");
  const isVisible = await button.isVisible();

  if (isVisible) await button.click();
  await page.click(".round-plus");

  await page.fill("#category-name", "New Category");
  await page.focus("#category-name");
  await page.keyboard.press("Enter");
  await page.click(".fa-circle-xmark");

  await page.click(".delete-btn");
  const categoriesContainer = await page.locator(".category-box-container");
  const hasNoChildren = await categoriesContainer.evaluate(
    (node) => node.children.length === 0
  );
  expect(hasNoChildren).toBe(true);
});

test("edits category name", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.locator(".welcome-page__btn");
  const isVisible = await button.isVisible();

  if (isVisible) await button.click();
  await page.click(".round-plus");

  await page.fill("#category-name", "New Category");
  await page.focus("#category-name");
  await page.keyboard.press("Enter");
  await page.click(".fa-circle-xmark");

  await page.click(".edit-btn");

  await page.fill(".category-box__name", "");
  await page.fill(".category-box__name", "edited name");
});

test("open close category window", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const button = await page.locator(".welcome-page__btn");
  const isVisible = await button.isVisible();

  if (isVisible) await button.click();
  await page.click(".round-plus");

  await page.fill("#category-name", "New Category");
  await page.focus("#category-name");
  await page.keyboard.press("Enter");
  await page.click(".fa-circle-xmark");

  const openButton = await page.locator(".button-open");
  await openButton.click();
  const categoryBox = openButton.locator("..").locator("..");
  await expect(categoryBox).toHaveClass(/active/);

  await openButton.click();
  await expect(categoryBox).not.toHaveClass(/active/);
});

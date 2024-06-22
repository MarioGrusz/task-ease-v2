import { z } from "zod";
import { Category } from "./category";

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(z.any()).optional(),
  taskRatio: z.number().optional(),
});

function validateCategory(category: Category) {
  return categorySchema.safeParse(category);
}

function validatePartialCategory(category: Category) {
  return categorySchema.partial().safeParse(category);
}

export { validateCategory, validatePartialCategory };

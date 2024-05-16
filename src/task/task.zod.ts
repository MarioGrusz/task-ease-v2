import { z } from 'zod';
import { Task } from './task';

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  remainingTime: z.union([z.number(), z.string()]),
  completed: z.boolean(),
});


function validateTask (task : Task) {
  return taskSchema.safeParse(task)
}


function validatePartialTask (task: Task) {
  return taskSchema.partial().safeParse(task)
}


export {
  validateTask, 
  validatePartialTask
}








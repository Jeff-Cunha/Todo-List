import { z } from 'zod';

const params = z.object({
  id: z.coerce.number().int().positive(),
});

//Criar uma Task
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3, { message: 'O título precisa ter no mínimo 3 caracteres.' }),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    categoryId: z.number().int().positive('O ID da categoria é obrigatório.'),
    tags: z.array(z.number().int().positive()).optional(),
  }),
});

//Atualizar uma Task
export const updateTaskSchema = z.object({
  body: createTaskSchema.shape.body.partial(),
  params,
});

// Params 
export const taskParamsSchema = z.object({
  params,
});
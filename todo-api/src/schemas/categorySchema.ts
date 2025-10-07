import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'O nome é obrigatório e precisa ter no mínimo 3 caracteres.' }),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }).optional(),
  }),
});
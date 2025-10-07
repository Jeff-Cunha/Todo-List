import { z } from 'zod';

//validar os parâmetros de rota (ID)
const params = z.object({
  id: z.coerce.number().int().positive('O ID deve ser um número inteiro positivo'),
});

//criar de uma Tag
export const createTagSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: 'O nome da tag precisa ter no mínimo 2 caracteres.' }),
  }),
});

// Atualizar (usando o create)
export const updateTagSchema = z.object({
  body: createTagSchema.shape.body.partial(), // Pega o 'body' e torna seus campos opcionais
  params,
});

//deletar e buscar por ID (só precisa validar o ID)
export const tagParamsSchema = z.object({
  params,
});

// Exportar os tipos inferidos para uso nos controllers, se necessário
export type CreateTagInput = z.infer<typeof createTagSchema>['body'];
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
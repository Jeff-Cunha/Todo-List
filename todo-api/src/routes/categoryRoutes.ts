import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryController';
import { validate } from '../middleware/validate';
import { createCategorySchema, updateCategorySchema } from '../schemas/categorySchema';
import { tagParamsSchema } from '../schemas/tagSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: API para gerenciamento de Categorias
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '409':
 *         description: Já existe uma categoria com este nome.
 *   get:
 *     summary: Retorna a lista de todas as categorias
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: Lista de categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.post('/', validate(createCategorySchema), createCategory);
router.get('/', getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Busca uma categoria pelo seu ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da categoria
 *     responses:
 *       '200':
 *         description: Dados da categoria.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Categoria não encontrada.
 *   put:
 *     summary: Atualiza uma categoria pelo seu ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Categoria não encontrada.
 *   delete:
 *     summary: Deleta uma categoria pelo seu ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da categoria
 *     responses:
 *       '204':
 *         description: Categoria deletada com sucesso (sem conteúdo).
 *       '404':
 *         description: Categoria não encontrada.
 */
router.get('/:id', validate(tagParamsSchema), getCategoryById);
router.put('/:id', validate(updateCategorySchema), updateCategory);
router.delete('/:id', validate(tagParamsSchema), deleteCategory);

export default router;
import { Router } from 'express';
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from '../controllers/tagController';
import { validate } from '../middleware/validate';
import { createTagSchema, tagParamsSchema, updateTagSchema } from '../schemas/tagSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tags
 *     description: API para gerenciamento de Tags
 */

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
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
 *         description: Tag criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '409':
 *         description: Já existe uma tag com este nome.
 *   get:
 *     summary: Retorna a lista de todas as tags
 *     tags: [Tags]
 *     responses:
 *       '200':
 *         description: Lista de tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.post('/', validate(createTagSchema), createTag);
router.get('/', getAllTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Busca uma tag pelo seu ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tag
 *     responses:
 *       '200':
 *         description: Dados da tag.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '404':
 *         description: Tag não encontrada.
 *   put:
 *     summary: Atualiza uma tag pelo seu ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tag
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
 *         description: Tag atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       '404':
 *         description: Tag não encontrada.
 *   delete:
 *     summary: Deleta uma tag pelo seu ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tag
 *     responses:
 *       '204':
 *         description: Tag deletada com sucesso.
 *       '404':
 *         description: Tag não encontrada.
 */
router.get('/:id', validate(tagParamsSchema), getTagById);
router.put('/:id', validate(updateTagSchema), updateTag);
router.delete('/:id', validate(tagParamsSchema), deleteTag);

export default router;
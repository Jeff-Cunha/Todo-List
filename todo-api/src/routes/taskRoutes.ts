import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskController';
import { validate } from '../middleware/validate';
import { createTaskSchema, taskParamsSchema, updateTaskSchema } from '../schemas/taskSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: API para gerenciamento de Tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '201':
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: "Dados inválidos (ex: categoria ou tag não existem)."
 *   get:
 *     summary: Retorna a lista de todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: Lista de tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.post('/', validate(createTaskSchema), createTask);
router.get('/', getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa pelo seu ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tarefa
 *     responses:
 *       '200':
 *         description: Dados da tarefa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Tarefa não encontrada.
 *   put:
 *     summary: Atualiza uma tarefa pelo seu ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Tarefa não encontrada.
 *   delete:
 *     summary: Deleta uma tarefa pelo seu ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da tarefa
 *     responses:
 *       '204':
 *         description: Tarefa deletada com sucesso (sem conteúdo).
 *       '404':
 *         description: Tarefa não encontrada.
 */
router.get('/:id', validate(taskParamsSchema), getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', validate(taskParamsSchema), deleteTask);

export default router;

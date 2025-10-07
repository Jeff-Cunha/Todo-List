
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, completed, categoryId, tags } = req.body;
  try {
    const data: any = {
      title,
      description,
      completed,
      category: { connect: { id: categoryId } },
    };

    // Se houver tags, conecta-as à task
    if (tags && tags.length > 0) {
      data.tags = {
        connect: tags.map((tagId: number) => ({ id: tagId })),
      };
    }

    const newTask = await prisma.task.create({
      data,
      include: { category: true, tags: true }, // Retorna a task com a categoria e tags
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Não foi possível criar a task. Verifique se a categoria e as tags existem.' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    include: { category: true, tags: true }, 
  });
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { category: true, tags: true },
  });
  if (!task) return res.status(404).json({ message: 'Task não encontrada.' });
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed, categoryId, tags } = req.body;
  try {
    const data: any = { title, description, completed };

    if (categoryId) {
      data.category = { connect: { id: categoryId } };
    }
    if (tags) {
      data.tags = {
        set: tags.map((tagId: number) => ({ id: tagId })),
      };
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data,
      include: { category: true, tags: true },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: 'Task não encontrada.' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Task não encontrada.' });
  }
};

import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createTag = async (req: Request, res: Response) => {
  try {
    const newTag = await prisma.tag.create({ data: req.body });
    res.status(201).json(newTag);
  } catch (error) {
    // Código 'P2002' é o erro de violação de restrição única do Prisma 
    if (error instanceof Error && (error as any).code === 'P2002') {
      return res.status(409).json({ message: 'Uma tag com este nome já existe.' });
    }
    res.status(500).json({ error: 'Não foi possível criar a tag.' });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
};

export const getTagById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tag = await prisma.tag.findUnique({ where: { id: Number(id) } });
  if (!tag) return res.status(404).json({ message: 'Tag não encontrada.' });
  res.json(tag);
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedTag = await prisma.tag.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedTag);
  } catch (error) {
    res.status(404).json({ message: 'Tag não encontrada.' });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Tag não encontrada.' });
  }
};
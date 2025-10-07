import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await prisma.category.create({ data: req.body });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Could not create category' });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id: Number(id) } });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(updatedCategory);
    } catch (error) {
        res.status(404).json({ error: 'Category not found' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Category not found' });
    }
};
import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Название обязательно' });
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory.toJSON());
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.json(categories.map(category => category.toJSON()));
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Категория не найдена' });
        res.json(category.toJSON());
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Название обязательно' });

        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Категория не найдена' });

        const oldName = category.name;

        category.name = name;
        const updatedCategory = await category.save();

        const updateResult = await Product.updateMany({ category: oldName }, { $set: { category: name } });

        res.json(updatedCategory.toJSON());
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Категория не найдена' });
        }

        const hasProducts = await Product.findOne({ category: category.name });
        if (hasProducts) {
            return res.status(400).json({
                message: `Невозможно удалить категорию "${category.name}", так как в ней есть товары.`
            });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Категория удалена' });
    } catch (error) {
        next(error);
    }
};
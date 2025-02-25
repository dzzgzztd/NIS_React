import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, category, quantity, price, image, unit } = req.body;
        if (!name || !description || !category || quantity == null || price == null) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }
        const newProduct = new Product({ name, description, category, quantity, price, image, unit });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct.toJSON());
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const offset = parseInt(req.query.offset as string) || 0;
        const products = await Product.find().skip(offset).limit(limit);
        res.json(products.map(product => product.toJSON()));
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Товар не найден' });
        res.json(product.toJSON());
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, category, quantity, price, image, unit } = req.body;
        if (!name || !description || !category || quantity == null || price == null) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, category, quantity, price, image, unit },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Товар не найден' });
        res.json(updatedProduct.toJSON());
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Товар не найден' });
        res.json({ message: 'Товар удален' });
    } catch (error) {
        next(error);
    }
};

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Руты API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware для обработки ошибок
app.use(errorHandler);

// Подключение к MongoDB
mongoose.set('strictQuery', false);
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-project';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

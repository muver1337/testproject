// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; // предполагается, что ты экспортируешь по умолчанию

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // укажи фронтенд-URL
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

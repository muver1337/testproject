import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRouter from '../routes/userRoutes'; // Путь к твоему роутеру

const app = express();

// Конфигурация Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'API документация для работы с пользователями',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Укажи свой адрес
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Указываем формат токена (например, JWT)
                },
            },
        },
    },
    apis: ['./src/routes/userRoutes.ts', './src/swaggerAnnotations.ts'], // Включаем путь к файлам с аннотациями
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api', userRouter);

app.listen(3000, () => {
    console.log('🚀 Server is running at http://localhost:3000');
});

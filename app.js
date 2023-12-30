import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerMiddleware from './middlewares/swaggerMiddleware.js'; // Certifique-se de que o caminho está correto

const app = express();

app.use(cors());
app.use(express.json());

// Aplica o middleware do Swagger
swaggerMiddleware(app);

// Rotas do Chat
app.use(authRoutes);
app.use(chatRoutes);

export default app;

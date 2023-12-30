import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Chat',
      version: '1.0.0',
      description: 'Uma API para gerenciamento de chat',
    },
    servers: [
      {
        url: process.env.HOST_URL || 'http://localhost:3000', // Use a variável de ambiente HOST_URL
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Correção aqui: criar uma função para o middleware do Swagger
const swaggerMiddleware = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerMiddleware;

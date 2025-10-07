import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';

// Importa as rotas
import categoryRoutes from './routes/categoryRoutes';
import taskRoutes from './routes/taskRoutes';
import tagRoutes from './routes/tagRoutes';

const app = express();
const PORT = 3000;

app.use(cors()); // Habilita o Cross-Origin Resource Sharing para permitir requisições do frontend
app.use(express.json()); // Habilita o parseamento de JSON no corpo das requisições

// Cria um roteador base para a API para manter as rotas organizadas sob o prefixo /api
const apiRouter = express.Router();
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/tags', tagRoutes);

app.use('/api', apiRouter);

// Rota para servir a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia o servidor e exibe mensagens úteis no console
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${3000}`);
  console.log(`📚 Documentação do Swagger disponível em http://localhost:${3000}/api-docs`);
});
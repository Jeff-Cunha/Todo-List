// swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do List API',
      version: '1.0.0',
      description: 'A simple Express To-Do List API documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    // TODOS OS SCHEMAS AGORA VIVEM AQUI, EM UM ÚNICO LUGAR
    components: {
      schemas: {
        // Schema da Categoria
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'integer', description: 'O ID auto-gerado da categoria.' },
            name: { type: 'string', description: 'O nome da categoria.' },
          },
          example: { id: 1, name: 'Trabalho' },
        },
        // Schema da Tag
        Tag: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'integer', description: 'O ID auto-gerado da tag.' },
            name: { type: 'string', description: 'O nome da tag.' },
          },
          example: { id: 1, name: 'Urgente' },
        },
        // Schema da Task (para respostas)
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'O ID da tarefa.' },
            title: { type: 'string', description: 'O título da tarefa.' },
            description: { type: 'string', description: 'A descrição da tarefa (opcional).' },
            completed: { type: 'boolean', description: 'Indica se a tarefa foi concluída.' },
            createdAt: { type: 'string', format: 'date-time', description: 'A data de criação.' },
            updatedAt: { type: 'string', format: 'date-time', description: 'A data da atualização.' },
            category: { $ref: '#/components/schemas/Category' },
            tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
          },
        },
        // Schema para entrada de dados da Task (para POST e PUT)
        TaskInput: {
          type: 'object',
          required: ['title', 'categoryId'],
          properties: {
            title: { type: 'string', example: 'Estudar Swagger' },
            description: { type: 'string', example: 'Aprender a documentar a API com JSDoc.' },
            completed: { type: 'boolean', example: false },
            categoryId: { type: 'integer', description: 'O ID da categoria da tarefa.', example: 1 },
            tags: { type: 'array', description: 'Lista de IDs de tags para associar.', items: { type: 'integer' }, example: [1, 2] },
          },
        },
      },
    },
  },
  // Garanta que esta linha está lendo todos os arquivos de rotas novamente
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
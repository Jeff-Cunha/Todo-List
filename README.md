API de Todo-List
Este repositório contém o código-fonte de uma API RESTful completa para um sistema de gerenciamento de tarefas (To-Do List). A API foi construída seguindo as melhores práticas de desenvolvimento, com uma arquitetura em camadas, validação de dados e documentação interativa.

O sistema permite gerenciar três recursos principais: Tarefas (Tasks), Categorias (Categories) e Tags, com relações complexas entre eles.

📋 Tabela de Conteúdos
Funcionalidades Principais

Tecnologias Utilizadas

Pré-requisitos

Instalação e Configuração

Documentação da API

Endpoints

✨ Funcionalidades Principais
CRUD Completo: Operações de Criar, Ler, Atualizar e Deletar para os três recursos.

Relações Complexas:

Um-para-Muitos: Cada Tarefa pertence a uma Categoria.

Muitos-para-Muitos: Uma Tarefa pode ter várias Tags, e uma Tag pode ser associada a várias Tarefas.

Validação de Dados: Uso da biblioteca Zod para garantir que todos os dados que entram na API sigam regras predefinidas, retornando erros claros em caso de falha.

Documentação Interativa: Geração automática de uma documentação completa e interativa com Swagger (OpenAPI), permitindo testar todos os endpoints diretamente pelo navegador.

Arquitetura em Camadas: Código organizado com uma clara separação de responsabilidades (Rotas, Controladores, Schemas de Validação), facilitando a manutenção e escalabilidade.

🚀 Tecnologias Utilizadas
Tecnologia	Descrição
Node.js	Ambiente de execução para JavaScript no servidor.
Express.js	Framework web para Node.js, usado para construir a API.
TypeScript	Superset do JavaScript que adiciona tipagem estática ao código.
PostgreSQL	Banco de dados relacional robusto e de código aberto.
Prisma	ORM (Object-Relational Mapper) de última geração para Node.js e TypeScript.
Zod	Biblioteca para declaração e validação de esquemas de dados.
Swagger (swagger-jsdoc & swagger-ui-express)	Ferramentas para gerar a documentação da API.
ts-node-dev	Ferramenta para rodar o ambiente de desenvolvimento em TypeScript com recarregamento automático.
✅ Pré-requisitos
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

Node.js (versão 18.x ou superior)

PostgreSQL (instalado e rodando)

Um gerenciador de pacotes como NPM ou Yarn

⚙️ Como Instalar e Rodar o Projeto
Siga os passos abaixo para ter o projeto rodando em sua máquina local:

1. Clone o repositório:
bash
git clone https://github.com/SEU_USUARIO/todo-api.git
cd todo-api
2. Instale as dependências:
bash
npm install
3. Configure as variáveis de ambiente:
Crie uma cópia do arquivo de exemplo .env.example:

bash
cp .env.example .env
Abra o arquivo .env e substitua SUA_SENHA pela senha do seu usuário postgres no PostgreSQL. O nome do banco de dados deve ser todolist_db (ou o nome que você criou).

text
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/todolist_db"
4. Crie e aplique as migrações do banco de dados:
Este comando irá ler seu schema.prisma, criar as tabelas no banco de dados e gerar o Prisma Client.

bash
npx prisma migrate dev
5. Inicie o servidor em modo de desenvolvimento:
bash
npm run dev
Pronto! O servidor estará rodando em http://localhost:3000.

📖 Documentação da API (Swagger)
A documentação completa e interativa da API está disponível via Swagger. Com o servidor rodando, acesse a seguinte URL no seu navegador:

http://localhost:3000/api-docs

Lá, você poderá ver todos os endpoints, os dados que eles esperam e as respostas que retornam, além de poder testar cada um deles diretamente.

🌐 Endpoints da API
A URL base para todos os endpoints é /api.

Categories
Método HTTP	Endpoint	Descrição
POST	/categories	Cria uma nova categoria.
GET	/categories	Lista todas as categorias.
GET	/categories/{id}	Busca uma categoria por ID.
PUT	/categories/{id}	Atualiza uma categoria.
DELETE	/categories/{id}	Deleta uma categoria.
Tags
Método HTTP	Endpoint	Descrição
POST	/tags	Cria uma nova tag.
GET	/tags	Lista todas as tags.
GET	/tags/{id}	Busca uma tag por ID.
PUT	/tags/{id}	Atualiza uma tag.
DELETE	/tags/{id}	Deleta uma tag.
Tasks
Método HTTP	Endpoint	Descrição
POST	/tasks	Cria uma nova tarefa, associando a uma categoria e a tags.
GET	/tasks	Lista todas as tarefas.
GET	/tasks/{id}	Busca uma tarefa por ID.
PUT	/tasks/{id}	Atualiza uma tarefa.
DELETE	/tasks/{id}	Deleta uma tarefa.

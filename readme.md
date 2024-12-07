📚 Leia mais - Gerenciamento de Leitura

Este é um projeto para gerenciamento de hábitos de leitura, composto por um frontend em React Native (Expo) e um backend em Node.js com TypeScript e MongoDB. O objetivo é auxiliar os usuários a acompanharem sua evolução literária, fornecendo estatísticas de leitura.

📁 Estrutura do Projeto

# Frontend (React Native + Expo)
Aplicativo móvel responsivo e interativo que permite aos usuários:

1. Registrar novos livros.
2. Atualizar a quantidade de páginas lidas.
3. Visualizar estatísticas de leitura.

# Backend (Node.js + TypeScript + MongoDB)
API RESTful para gerenciar dados dos usuários, livros e estatísticas:

1. CRUD completo para livros.
2. Autenticação JWT para segurança.

🚀 Tecnologias Utilizadas

# Frontend:
1. React Native
2. Expo
3. React Navigation
4. Axios

# Backend:
1. Node.js
2. TypeScript
3. Express
4. MongoDB
5. Mongoose

🛠️ Pré-requisitos

1. Node.js e npm instalados.
2. MongoDB em execução localmente ou configurado na nuvem (como MongoDB Atlas).
3. Expo CLI instalado globalmente:
npm install -g expo-cli

🔧 Instalação e Configuração

1. Clone o repositório
git clone https://github.com/seu-usuario/gerenciador-leitura.git
cd gerenciador-leitura

2. Configure o Backend

2.1. Navegue para a pasta do backend:
cd backend

2.2. Instale as dependências:
npm install

2.3. Crie o arquivo .env e configure as variáveis de ambiente, como a URL do MongoDB:

2.3. Inicie o servidor:
npm run dev

2.4. O backend estará disponível.

3. Configure o Frontend

3.1. Navegue para a pasta do frontend:
cd ../frontend

3.2. Instale as dependências:
npm install

3.3. Inicie o projeto Expo:
npm start

3.4. Escaneie o QR code no terminal com o aplicativo Expo Go no seu dispositivo móvel.

📋 Funcionalidades

Usuário:
1. Cadastro e login com segurança.

Livros:
1. Adicionar, editar, excluir e listar livros.
2. Atualizar progresso de leitura.

Estatísticas:
1. Visualizar total de livros lidos.
2. Monitorar o progresso de leitura em gráficos.

// Importa o framework Express para criação da API
const express = require("express");
// Importa o CORS para permitir que aplicações frontend (como o React Native) comuniquem com o backend
const cors = require("cors");
// Importa o módulo nativo "path" para lidar com caminhos de diretórios e arquivos de forma segura
const path = require("path");

// Importa os arquivos de rotas específicos da aplicação
const usuarioRoutes = require("./routes/usuarioRoutes");
const desafioRoutes = require("./routes/desafioRoutes");

// Inicializa a aplicação Express
const app = express();

// Configura o CORS para liberar o acesso de outras origens/frontends
app.use(cors());
// Habilita o Express para ler e interpretar requisições enviadas no formato JSON
app.use(express.json());
// Habilita o Express para decodificar dados vindos de formulários URL-encoded
app.use(express.urlencoded({ extended: true }));

// SERVIÇO DE ARQUIVOS ESTÁTICOS (Uploads)
// Torna a pasta "uploads" acessível publicamente via URL (ex: http://localhost:3000/uploads/foto.jpg)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// REGISTRO DAS ROTAS DA API
// Todas as rotas iniciadas com "/usuarios" serão direcionadas para o arquivo de rotas de usuário
app.use("/usuarios", usuarioRoutes);
// Todas as rotas iniciadas com "/desafios" serão direcionadas para o arquivo de rotas de desafios/sessões
app.use("/desafios", desafioRoutes);

// Exporta a aplicação configurada para ser iniciada no arquivo de entrada principal (ex: server.js)
module.exports = app;
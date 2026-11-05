const app = require("./app");
const sequelize = require("./config/database");

// Carrega os models e relacionamentos
require("./models");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    // Sincroniza as tabelas com o PostgreSQL automaticamente
    await sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado e conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao conectar no banco de dados:", erro);
  }
}

iniciarServidor();
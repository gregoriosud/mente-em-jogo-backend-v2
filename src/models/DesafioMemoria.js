// Importa os tipos de dados do Sequelize (INTEGER, STRING, etc.)
const { DataTypes } = require("sequelize");
// Importa a conexão com o banco de dados configurada previamente
const sequelize = require("../config/database");

// Define o modelo "DesafioMemoria", que mapeia a tabela no banco
const DesafioMemoria = sequelize.define(
  "DesafioMemoria",
  {
    // Campo ID: Chave primária, inteira e com incremento automático
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo usuario_id: Armazena o ID do usuário que jogou (Chave estrangeira)
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Obrigatório preencher
    },
    // Campo nivel: Guarda a dificuldade ou fase do desafio (ex: "Fácil", "Médio")
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo tempo_segundos: Quantos segundos o usuário levou para concluir
    tempo_segundos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo tentativas: Número total de tentativas feitas
    tentativas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo acertos: Quantidade de respostas corretas
    acertos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo erros: Quantidade de erros cometidos
    erros: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo pontuacao: Pontuação total obtida no desafio
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Nome exato da tabela no PostgreSQL
    tableName: "desafios_memoria",
    // Habilita as colunas automáticascreatedAt e updatedAt para controle de datas
    timestamps: true,
  }
);

// Exporta o modelo para ser utilizado nos controllers e rotas da API
module.exports = DesafioMemoria;
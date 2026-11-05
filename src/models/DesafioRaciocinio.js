// Importa os tipos de dados do Sequelize (INTEGER, STRING, etc.)
const { DataTypes } = require("sequelize");
// Importa a instância de conexão com o banco de dados PostgreSQL
const sequelize = require("../config/database");

// Define o modelo "DesafioRaciocinio", mapeando a tabela correspondente
const DesafioRaciocinio = sequelize.define(
  "DesafioRaciocinio",
  {
    // Campo ID: Chave primária da tabela, inteira com autoincremento
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo usuario_id: Chave estrangeira que identifica qual usuário realizou o desafio
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Preenchimento obrigatório
    },
    // Campo nivel: Armazena o nível de dificuldade do desafio de raciocínio (ex: "Fácil", "Médio", "Difícil")
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo tempo_segundos: Duração total em segundos que o usuário levou para concluir
    tempo_segundos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo questoes_respondidas: Quantidade total de questões respondidas na sessão
    questoes_respondidas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo acertos: Número de respostas corretas obtidas
    acertos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo erros: Número de respostas incorretas cometidas
    erros: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo pontuacao: Pontuação total calculada com base no desempenho
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Nome físico exato da tabela no banco PostgreSQL
    tableName: "desafios_raciocinio",
    // Ativa o controle automático de datas (createdAt e updatedAt)
    timestamps: true,
  }
);

// Exporta o modelo para ser utilizado nos controllers e rotas da API
module.exports = DesafioRaciocinio;
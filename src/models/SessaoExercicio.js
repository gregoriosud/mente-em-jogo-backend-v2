// Importa os tipos de dados do Sequelize (INTEGER, DATE, etc.)
const { DataTypes } = require("sequelize");
// Importa a instância de conexão com o banco de dados PostgreSQL
const sequelize = require("../config/database");

// Define o modelo "SessaoExercicio", mapeando a tabela correspondente no banco
const SessaoExercicio = sequelize.define(
  "SessaoExercicio",
  {
    // Campo ID: Chave primária da tabela, inteira com autoincremento
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo usuario_id: Chave estrangeira que identifica qual usuário realizou a sessão de exercícios
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Preenchimento obrigatório
    },
    // Campo data_inicio: Data e hora exatas em que a sessão de treino/estudo foi iniciada
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Campo data_fim: Data e hora exatas em que a sessão foi encerrada
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Campo total_cards_executados: Quantidade total de cartões/atividades passados na sessão (valor padrão é 0)
    total_cards_executados: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Nome físico exato da tabela no banco PostgreSQL
    tableName: "sessoes_exercicio",
    // Ativa o controle automático de datas de criação e atualização do registro (createdAt e updatedAt)
    timestamps: true,
  }
);

// Exporta o modelo para ser utilizado nos controllers e nas associações do sistema
module.exports = SessaoExercicio;
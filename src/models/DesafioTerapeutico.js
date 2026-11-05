// Importa os tipos de dados do Sequelize (INTEGER, STRING, TEXT, BOOLEAN, etc.)
const { DataTypes } = require("sequelize");
// Importa a instância de conexão com o banco de dados PostgreSQL
const sequelize = require("../config/database");

// Define o modelo "DesafioTerapeutico", mapeando a tabela correspondente
const DesafioTerapeutico = sequelize.define(
  "DesafioTerapeutico",
  {
    // Campo ID: Chave primária da tabela, inteira com autoincremento
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo usuario_id: Chave estrangeira que identifica qual usuário realizou o exercício terapêutico
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Preenchimento obrigatório
    },
    // Campo nome_exercicio: Nome da prática terapêutica realizada (ex: "Respiração de Alívio", "Celebrar a Semana")
    nome_exercicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo tempo_duracao_segundos: Duração total em segundos que o usuário dedicou ao exercício
    tempo_duracao_segundos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Campo nivel_estresse_autorreferido: Nível de estresse informado pelo próprio usuário (permite nulo caso opte por não preencher)
    nivel_estresse_autorreferido: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Campo observacao_terapeuta: Texto livre para anotações terapêuticas ou reflexões do usuário/terapeuta (tipo TEXT para textos longos)
    observacao_terapeuta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Campo concluido: Booleano (true/false) que indica se o exercício foi concluído com sucesso (padrão é true ao salvar)
    concluido: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // Nome físico exato da tabela no banco PostgreSQL (com "s" no final)
    tableName: "desafios_terapeuticos",
    // Ativa o controle automático de datas (createdAt e updatedAt)
    timestamps: true,
  }
);

// Exporta o modelo para ser utilizado nos controllers e rotas da API
module.exports = DesafioTerapeutico;
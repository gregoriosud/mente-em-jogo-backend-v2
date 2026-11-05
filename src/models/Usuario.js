// Importa os tipos de dados do Sequelize (INTEGER, STRING, etc.)
const { DataTypes } = require("sequelize");
// Importa a instância de conexão com o banco de dados PostgreSQL
const sequelize = require("../config/database");

// Define o modelo "Tb_Usuario", mapeando a tabela de usuários correspondente
const Usuario = sequelize.define(
  "Tb_Usuario",
  {
    // Campo ID: Chave primária da tabela, inteira com autoincremento
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo nome: Nome completo do usuário ou paciente
    nome: {
      type: DataTypes.STRING,
      allowNull: false, // Preenchimento obrigatório
    },
    // Campo email: E-mail do usuário (único no sistema, com validação automática de formato de e-mail)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Não permite dois cadastros com o mesmo e-mail
      validate: { isEmail: true }, // Valida se o texto digitado tem formato de e-mail válido
    },
    // Campo senha: Armazena o hash criptografado da senha do usuário (nunca a senha limpa)
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Campo foto: Caminho ou nome do arquivo de imagem de perfil do usuário (opcional)
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Campo tipoUsuario: Define o nível de permissão (1 para Administrador/Terapeuta, 2 para Paciente/Jogador, com padrão 2)
    tipoUsuario: {
      type: DataTypes.INTEGER,
      defaultValue: 2, // 1: Admin/Terapeuta, 2: Paciente/Jogador
    },
    // CORREÇÃO: Adicionado o campo pontos para acumular a energia dos desafios
    pontos: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Inicia zerado para novos usuários
    },
  },
  {
    // Nome físico exato da tabela no banco PostgreSQL (com letras maiúsculas/minúsculas conforme criado no banco)
    tableName: "Tb_Usuario",
    // Ativa o controle automático de datas de criação e atualização (createdAt e updatedAt)
    timestamps: true,
  }
);

// Exporta o modelo para ser utilizado nos controllers, autenticação e associações
module.exports = Usuario;
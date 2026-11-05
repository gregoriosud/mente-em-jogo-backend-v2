// Importa o modelo de Usuário do Sequelize (para interagir com a tabela Tb_Usuario no PostgreSQL)
const { Usuario } = require("../models");
// Importa o bcryptjs para encriptar (fazer o hash) e validar senhas de forma segura
const bcrypt = require("bcryptjs");
// Importa o jsonwebtoken para gerar tokens de autenticação (JWT)
const jwt = require("jsonwebtoken");

module.exports = {
  // 1. CRIAR / CADASTRAR NOVO USUÁRIO
  async criar(req, res) {
    try {
      // Recebe os dados enviados no corpo da requisição (JSON/FormData)
      const { nome, email, senha, tipoUsuario } = req.body;

      // Verifica se já existe algum usuário cadastrado com o mesmo e-mail
      const usuarioExiste = await Usuario.findOne({ where: { email } });
      if (usuarioExiste) {
        return res.status(400).json({ erro: "E-mail já cadastrado." });
      }

      // Transforma a senha em um hash criptografado com custo 10 (nunca salvamos senha pura)
      const senhaHash = await bcrypt.hash(senha, 10);
      // Verifica se foi enviada uma foto de perfil através de upload (Multer)
      const fotoPath = req.file ? req.file.filename : null;

      // Cria o registro do novo usuário no banco de dados PostgreSQL
      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        foto: fotoPath,
        tipoUsuario: tipoUsuario || 2, // Define padrão como 2 caso o tipo não seja enviado
      });

      // Converte o objeto do Sequelize em JSON e remove a senha antes de retornar ao front-end
      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      // Retorna status 201 (Criado) com os dados do usuário (sem a senha)
      return res.status(201).json(usuarioSemSenha);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao criar usuário: " + erro.message });
    }
  },

  // 2. REALIZAR LOGIN
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Busca o usuário no banco pelo e-mail informado
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      // Compara a senha digitada com o hash encriptado salvo no banco de dados
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: "Senha incorreta." });
      }

      // Gera um Token JWT contendo o ID e o tipo do usuário, válido por 7 dias
      const token = jwt.sign(
        { id: usuario.id, tipoUsuario: usuario.tipoUsuario },
        process.env.JWT_SECRET || "mente_em_jogo_secret_key_2026",
        { expiresIn: "7d" }
      );

      // Remove a senha do objeto de resposta por segurança
      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      // Retorna o token de acesso e os dados do usuário logado
      return res.json({ usuario: usuarioSemSenha, token });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao realizar login: " + erro.message });
    }
  },

  // 3. LISTAR TODOS OS USUÁRIOS
  async listar(req, res) {
    try {
      // Busca todos os registros, mas oculta o campo "senha" de todos eles por segurança
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["senha"] },
      });
      return res.json(usuarios);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao listar usuários: " + erro.message });
    }
  },

  // 4. BUSCAR USUÁRIO ESPECÍFICO POR ID (Primary Key)
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      return res.json(usuario);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao buscar usuário: " + erro.message });
    }
  },

  // 5. ATUALIZAR DADOS DO USUÁRIO
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, tipoUsuario } = req.body;

      // Verifica se o usuário existe antes de atualizar
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      // Prepara o objeto com os campos básicos que podem ser alterados
      let dadosAtualizados = { nome, email, tipoUsuario };

      // Se o usuário informou uma nova senha, gera um novo hash para ela
      if (senha) {
        dadosAtualizados.senha = await bcrypt.hash(senha, 10);
      }

      // Se enviou uma nova foto de perfil, atualiza o caminho do arquivo
      if (req.file) {
        dadosAtualizados.foto = req.file.filename;
      }

      // Executa a atualização no banco de dados
      await usuario.update(dadosAtualizados);

      // Remove a senha antes de retornar o objeto atualizado
      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      return res.json(usuarioSemSenha);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao atualizar usuário: " + erro.message });
    }
  },

  // 6. DELETAR USUÁRIO
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      // Remove o registro da tabela
      await usuario.destroy();
      return res.json({ mensagem: "Usuário removido com sucesso." });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao deletar usuário: " + erro.message });
    }
  },
};
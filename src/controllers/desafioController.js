// Importa os modelos de dados (Models do Sequelize) que representam as tabelas no PostgreSQL
const {
  DesafioMemoria,
  DesafioRaciocinio,
  DesafioTerapeutico,
  SessaoExercicio,
  Usuario,
} = require("../models");

module.exports = {
  // 1. SALVAR DESAFIO DE MEMÓRIA (Módulo Lúdico)
  async salvarMemoria(req, res) {
    try {
      // Extrai as estatísticas do jogo enviadas no corpo da requisição (JSON)
      const { nivel, tempo_segundos, tentativas, acertos, erros, pontuacao } = req.body;
      
      // Pega o ID do usuário que veio decodificado do token JWT (graças ao middleware de autenticação)
      const usuario_id = req.usuarioId;

      // Cria um novo registro na tabela de memória usando o Sequelize
      const resultado = await DesafioMemoria.create({
        usuario_id,
        nivel,
        tempo_segundos,
        tentativas,
        acertos,
        erros,
        pontuacao,
      });

      // Busca o usuário no banco e soma os pontos do desafio à energia dele
      const usuario = await Usuario.findByPk(usuario_id);
      if (usuario) {
        const pontosAtuais = usuario.pontos || 0;
        const ganhoPontos = pontuacao || 0;
        await usuario.update({ pontos: pontosAtuais + ganhoPontos });
      }

      // Retorna o status HTTP 201 (Criado com sucesso) junto com o objeto salvo e o usuário atualizado
      return res.status(201).json({
        mensagem: "Desafio de memória salvo e energia atualizada com sucesso!",
        resultado,
        usuarioAtualizado: usuario
      });
    } catch (erro) {
      // Caso ocorra algum erro no banco de dados, retorna status 500 com a mensagem de erro
      return res.status(500).json({ erro: "Erro ao salvar desafio de memória: " + erro.message });
    }
  },

  // 2. SALVAR DESAFIO DE RACIOCÍNIO (Módulo Lógico)
  async salvarRaciocinio(req, res) {
    try {
      const { nivel, tempo_segundos, questoes_respondidas, acertos, erros, pontuacao } = req.body;
      const usuario_id = req.usuarioId;

      const resultado = await DesafioRaciocinio.create({
        usuario_id,
        nivel,
        tempo_segundos,
        questoes_respondidas,
        acertos,
        erros,
        pontuacao,
      });

      // Atualiza também a pontuação/energia do usuário para os desafios de raciocínio
      const usuario = await Usuario.findByPk(usuario_id);
      if (usuario) {
        const pontosAtuais = usuario.pontos || 0;
        const ganhoPontos = pontuacao || 0;
        await usuario.update({ pontos: pontosAtuais + ganhoPontos });
      }

      return res.status(201).json({
        mensagem: "Desafio de raciocínio salvo e energia atualizada com sucesso!",
        resultado,
        usuarioAtualizado: usuario
      });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao salvar desafio de raciocínio: " + erro.message });
    }
  },

  // 3. SALVAR EXERCÍCIO TERAPÊUTICO (Módulo Terapêutico)
  async salvarTerapeutico(req, res) {
    try {
      const { nome_exercicio, tempo_duracao_segundos, nivel_estresse_autorreferido, observacao_terapeuta, pontuacao } = req.body;
      const usuario_id = req.usuarioId;

      const resultado = await DesafioTerapeutico.create({
        usuario_id,
        nome_exercicio,
        tempo_duracao_segundos,
        nivel_estresse_autorreferido,
        observacao_terapeuta,
      });

      // CORREÇÃO APLICADA: Soma os pontos/energia no perfil do usuário no PostgreSQL
      const usuario = await Usuario.findByPk(usuario_id);
      if (usuario) {
        const pontosAtuais = usuario.pontos || 0;
        const ganhoPontos = pontuacao || 20; // Atribui 20 pontos por padrão se não for informado
        await usuario.update({ pontos: pontosAtuais + ganhoPontos });
      }

      return res.status(201).json({
        mensagem: "Exercício terapêutico salvo e energia atualizada com sucesso!",
        resultado,
        usuarioAtualizado: usuario
      });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao salvar exercício terapêutico: " + erro.message });
    }
  },

  // 4. REGISTRAR SESSÃO DE EXERCÍCIO GERAL
  async registrarSessao(req, res) {
    try {
      const { data_inicio, data_fim, total_cards_executados } = req.body;
      const usuario_id = req.usuarioId;

      const sessao = await SessaoExercicio.create({
        usuario_id,
        data_inicio,
        data_fim,
        total_cards_executados,
      });

      return res.status(201).json(sessao);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao registrar sessão: " + erro.message });
    }
  },

  // 5. LISTAR HISTÓRICO COMPLETO DO PACIENTE / USUÁRIO
  async listarHistoricoPaciente(req, res) {
    try {
      const { usuario_id } = req.params;

      const memorias = await DesafioMemoria.findAll({ where: { usuario_id } });
      const raciocinios = await DesafioRaciocinio.findAll({ where: { usuario_id } });
      const terapeuticos = await DesafioTerapeutico.findAll({ where: { usuario_id } });
      const sessoes = await SessaoExercicio.findAll({ where: { usuario_id } });

      return res.json({
        usuario_id,
        desafios_memoria: memorias,
        desafios_raciocinio: raciocinios,
        desafios_terapeuticos: terapeuticos,
        sessoes_exercicio: sessoes,
      });
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao buscar histórico: " + erro.message });
    }
  },
};
const express = require("express");
const router = express.Router();
const desafioController = require("../controllers/desafioController");
const authMiddleware = require("../middlewares/auth");

// Todas as rotas de desafios exigem autenticação (Token JWT)
router.use(authMiddleware);

router.post("/memoria", desafioController.salvarMemoria);
router.post("/raciocinio", desafioController.salvarRaciocinio);
router.post("/terapeutico", desafioController.salvarTerapeutico);
router.post("/sessao", desafioController.registrarSessao);
router.get("/historico/:usuario_id", desafioController.listarHistoricoPaciente);

module.exports = router;
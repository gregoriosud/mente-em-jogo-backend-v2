const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/auth");
const upload = require("../config/multer");

// Rotas públicas (Cadastro e Login)
router.post("/", upload.single("foto"), usuarioController.criar);
router.post("/login", usuarioController.login);

// Rotas protegidas (Exigem Token JWT)
router.get("/", authMiddleware, usuarioController.listar);
router.get("/:id", authMiddleware, usuarioController.buscarPorId);
router.put("/:id", authMiddleware, upload.single("foto"), usuarioController.atualizar);
router.delete("/:id", authMiddleware, usuarioController.deletar);

module.exports = router;
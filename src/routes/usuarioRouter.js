const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const usuarioController = require("../controllers/usuarioController.js");
const {
  criarUsuarioSchema,
  atualizarUsuarioSchema,
  autenticarSchema,
} = require("../schemas/usuarioSchema.js");

const usuarioRouter = express.Router();

usuarioRouter.post(
  "/",
  validateSchema(criarUsuarioSchema),
  usuarioController.criar
);

usuarioRouter.put(
  "/",
  validateSchema(atualizarUsuarioSchema),
  usuarioController.atualizar
);

usuarioRouter.post(
  "/entrar",
  validateSchema(autenticarSchema),
  usuarioController.autenticar
);

module.exports = usuarioRouter;

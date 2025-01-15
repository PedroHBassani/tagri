const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const usuarioController = require("../controllers/usuarioController.js");
const {
  criarUsuarioSchema,
  atualizarUsuarioSchema,
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

module.exports = usuarioRouter;

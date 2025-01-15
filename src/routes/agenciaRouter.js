const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const agenciaController = require("../controllers/agenciaController.js");
const {
  criarAgenciaSchema,
  atualizarAgenciaSchema,
} = require("../schemas/agenciaSchema.js");

const agenciaRouter = express.Router();

agenciaRouter.post(
  "/",
  validateSchema(criarAgenciaSchema),
  agenciaController.criar
);

agenciaRouter.put(
  "/",
  validateSchema(atualizarAgenciaSchema),
  agenciaController.atualizar
);

agenciaRouter.get("/", agenciaController.listar);
agenciaRouter.get("/:id", agenciaController.pegar);

module.exports = agenciaRouter;

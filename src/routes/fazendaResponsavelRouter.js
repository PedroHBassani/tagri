const express = require("express");
const fazendaResponsavelController = require("../controllers/fazendaResponsavelController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarFazendaResponsavelSchema,
  pegarFazendaResponsavelSchema,
  atualizarFazendaResponsavelSchema,
} = require("../schemas/fazendaResponsavelSchema.js");

const fazendaResponsavelRouter = express.Router();

fazendaResponsavelRouter.post(
  "/responsavel",
  validateSchema(criarFazendaResponsavelSchema),
  fazendaResponsavelController.criar
);

fazendaResponsavelRouter.put(
  "/responsavel",
  validateSchema(atualizarFazendaResponsavelSchema),
  fazendaResponsavelController.atualizar
);

fazendaResponsavelRouter.get(
  "/responsavel/:pessoa_fisica_id",
  validateSchema(pegarFazendaResponsavelSchema, "params"),
  fazendaResponsavelController.pegar
);

fazendaResponsavelRouter.get(
  "/fazenda/responsaveis",
  fazendaResponsavelController.listar
);

module.exports = fazendaResponsavelRouter;

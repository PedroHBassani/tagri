const express = require("express");
const estoqueController = require("../controllers/estoqueController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarEstoqueSchema,
  atualizarEstoqueSchema,
  listarSchema,
} = require("../schemas/estoqueSchema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");

const estoqueRouter = express.Router();

estoqueRouter.post(
  "/",
  validateSchema(criarEstoqueSchema),
  estoqueController.criar
);

estoqueRouter.put(
  "/",
  validateSchema(atualizarEstoqueSchema),
  estoqueController.atualizar
);

estoqueRouter.get(
  "/",
  validateSchema(listarSchema, "query"),
  estoqueController.listarPelaEntidade
);
estoqueRouter.get(
  "/:id",
  validateSchema(pegarSchema, "params"),
  estoqueController.pegar
);

estoqueRouter.delete(
  "/:id",
  validateSchema(pegarSchema),
  estoqueController.deletar
);

module.exports = estoqueRouter;

const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const produtoValorController = require("../controllers/produtoValorController.js");
const { pegarSchema } = require("../schemas/commonSchema.js");
const {
  criarProdutoValorSchema,
  pegarValorSchema,
  atualizarProdutoValorSchema,
} = require("../schemas/produtoValorSchema.js");

const produtoValorRouter = express.Router();

produtoValorRouter.post(
  "/valor",
  validateSchema(criarProdutoValorSchema),
  produtoValorController.criar
);

produtoValorRouter.get(
  "/valores/:valor_id",
  validateSchema(pegarValorSchema),
  produtoValorController.pegar
);
produtoValorRouter.get(
  "/:id/valores",
  validateSchema(pegarSchema, "params"),
  produtoValorController.listar
);

produtoValorRouter.put(
  "/valor",
  validateSchema(atualizarProdutoValorSchema),
  produtoValorController.atualizar
);

produtoValorRouter.delete(
  "/valor/:id",
  validateSchema(pegarSchema, "params"),
  produtoValorController.deletar
);

module.exports = produtoValorRouter;

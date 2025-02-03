const express = require("express");
const produtoController = require("../controllers/produtoController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");
const {
  criarProdutoSchema,
  atualizarProdutoSchema,
} = require("../schemas/produtoSchema.js");

const produtoRouter = express.Router();

produtoRouter.post(
  "/",
  validateSchema(criarProdutoSchema),
  produtoController.criar
);

produtoRouter.get(
  "/{id}",
  validateSchema(pegarSchema, "params"),
  produtoController.pegar
);

produtoRouter.put(
  "/",
  validateSchema(atualizarProdutoSchema),
  produtoController.atualizar
);

produtoRouter.delete(
  "/{id}",
  validateSchema(pegarSchema, "params"),
  produtoController.deletar
);

produtoRouter.get("/", produtoController.listar);
produtoRouter.get("/paginate", produtoController.paginate);
produtoRouter.get("/tipos", produtoController.listar_tipos);
produtoRouter.get("/para-plantar", produtoController.listar_para_plantar);
// produtoRouter.get(
//   "/utilizar-safra",
//   produtoController.listar_para_utilizar_safra
// );
// produtoRouter.get(
//   "/melhor-eficiencia",
//   produtoController.pagar_melhor_eficiencia
// );
// produtoRouter.get(
//   "/unidade-medidas",
//   produtoController.listar_unidades_medidas
// );

module.exports = produtoRouter;

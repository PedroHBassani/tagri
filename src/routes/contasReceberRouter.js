const express = require("express");
const contasReceberController = require("../controllers/contasReceberController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarContasReceberSchema,
  criarComMovimentacaoEstoqueSchema,
  listarHistsSchema,
  baixarSchema,
  estornarSchema,
} = require("../schemas/contasReceberSchema.js");

const contasReceberRouter = express.Router();

contasReceberRouter.post(
  "/",
  validateSchema(criarContasReceberSchema),
  contasReceberController.criar
);

contasReceberRouter.post(
  "/movimentacao-estoque",
  validateSchema(criarComMovimentacaoEstoqueSchema),
  contasReceberController.criar_com_movimentacao_estoque
);

contasReceberRouter.post(
  "/baixar",
  validateSchema(baixarSchema),
  contasReceberController.baixar
);

contasReceberRouter.post(
  "/estornar",
  validateSchema(estornarSchema),
  contasReceberController.estornar
);

contasReceberRouter.get(
  "/{duplicata_parcela_id}/hists",
  validateSchema(listarHistsSchema, "params"),
  contasReceberController.listar_hists
);
contasReceberRouter.get("/", contasReceberController.listar);

module.exports = contasReceberRouter;

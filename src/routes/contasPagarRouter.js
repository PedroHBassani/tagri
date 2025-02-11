const express = require("express");
const contasPagarController = require("../controllers/contasPagarController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarContasPagarSchema,
  criarComMovimentacaoEstoqueSchema,
  listarHistsSchema,
  baixarSchema,
  estornarSchema,
} = require("../schemas/contasPagarSchema.js");

const contasPagarRouter = express.Router();

contasPagarRouter.post(
  "/",
  validateSchema(criarContasPagarSchema),
  contasPagarController.criar
);

contasPagarRouter.post(
  "/movimentacao-estoque",
  validateSchema(criarComMovimentacaoEstoqueSchema),
  contasPagarController.criar_com_movimentacao_estoque
);

contasPagarRouter.post(
  "/baixar",
  validateSchema(baixarSchema),
  contasPagarController.baixar
);

contasPagarRouter.post(
  "/estornar",
  validateSchema(estornarSchema),
  contasPagarController.estornar
);

contasPagarRouter.get(
  "/:duplicata_parcela_id/hists",
  validateSchema(listarHistsSchema, "params"),
  contasPagarController.listar_hists
);
contasPagarRouter.get("/", contasPagarController.listar);

module.exports = contasPagarRouter;

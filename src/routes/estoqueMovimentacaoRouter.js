const express = require("express");
const estoqueMovimentacaoController = require("../controllers/estoqueMovimentacaoController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarEstoqueMovimentacaoSchema,
  atualizarEstoqueMovimentacaoSchema,
  estoqueProdutoIdSchema,
} = require("../schemas/estoqueMovimentacaoSchema.js");

const estoqueMovimentacaoRouter = express.Router();

estoqueMovimentacaoRouter.post(
  "/movimentacao",
  validateSchema(criarEstoqueMovimentacaoSchema),
  estoqueMovimentacaoController.criar
);

estoqueMovimentacaoRouter.put(
  "/movimentacao",
  validateSchema(atualizarEstoqueMovimentacaoSchema),
  estoqueMovimentacaoController.atualizar
);

estoqueMovimentacaoRouter.delete(
  "/movimentacao/:estoque_produto_id",
  validateSchema(estoqueProdutoIdSchema, "params"),
  estoqueMovimentacaoController.deletar
);

estoqueMovimentacaoRouter.get(
  "/movimentacao/:estoque_produto_id",
  validateSchema(estoqueProdutoIdSchema, "params"),
  estoqueMovimentacaoController.pegar
);

// estoqueMovimentacaoRouter.get("/:estoque_id/movimentacoes", estoqueMovimentacaoController.paginate)

module.exports = estoqueMovimentacaoRouter;

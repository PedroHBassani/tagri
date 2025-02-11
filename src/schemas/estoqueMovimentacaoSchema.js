const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarEstoqueMovimentacaoSchema = Joi.object({
  estoque_id: idSchema,
  produto_id: idSchema,
  quantidade: Joi.number().min(0).required(),
  data: Joi.date().required(),
  sinal: Joi.number().required(),
});

const atualizarEstoqueMovimentacaoSchema = Joi.object({
  id: idSchema,
  estoque_id: idSchema,
  produto_id: idSchema,
  quantidade: Joi.number().min(0).required(),
  data: Joi.date().required(),
  sinal: Joi.number().required(),
});

const estoqueProdutoIdSchema = Joi.object({
  estoque_id: idSchema,
});

module.exports = {
  criarEstoqueMovimentacaoSchema,
  atualizarEstoqueMovimentacaoSchema,
  estoqueProdutoIdSchema
};

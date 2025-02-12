const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarProdutoValorSchema = Joi.object({
  produto_id: idSchema,
  cliente_fornecedor_id: idSchema.optional(),
  valor: Joi.number().min(0).required(),
  data: Joi.date().required(),
});

const atualizarProdutoValorSchema = Joi.object({
  id: idSchema,
  produto_id: idSchema,
  cliente_fornecedor_id: idSchema.optional(),
  valor: Joi.number().min(0).required(),
  data: Joi.date().required(),
});

const pegarValorSchema = Joi.object({
  valor_id: idSchema,
});

module.exports = {
  criarProdutoValorSchema,
  atualizarProdutoValorSchema,
  pegarValorSchema,
};

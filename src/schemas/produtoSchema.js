const Joi = require("joi");
const { idSchema, idSchemaOptional } = require("./commonSchema.js");

const criarProdutoSchema = Joi.object({
  tipo_id: Joi.number().min(0).required(),
  unidade_medida_id: Joi.number().min(0).required(),
  nome: Joi.string().min(2).max(100).required(),
  descricao: Joi.string().min(2).max(100).optional(),
});

const atualizarProdutoSchema = Joi.object({
  id: idSchema.required(),
  tipo_id: Joi.number().min(0).required(),
  unidade_medida_id: Joi.number().min(0).required(),
  nome: Joi.string().min(2).max(100).required(),
  descricao: Joi.string().min(2).max(100).optional(),
});

const paginateSchema = Joi.object({
  tipo_id: idSchemaOptional,
  nome: Joi.string().min(2).max(100).optional(),
  page: Joi.number().min(1).default(1).optional(),
  limit: Joi.number().min(1).default(15).optional(),
})

module.exports = {
  criarProdutoSchema,
  atualizarProdutoSchema,
  paginateSchema,
};

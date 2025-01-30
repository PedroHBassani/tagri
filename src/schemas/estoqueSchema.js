const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarEstoqueSchema = Joi.object({
  entidade_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

const atualizarEstoqueSchema = Joi.object({
  id: idSchema,
  entidade_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

const listarSchema = Joi.object({
  entidade_id: idSchema,
});

module.exports = {
  criarEstoqueSchema,
  atualizarEstoqueSchema,
  listarSchema
};

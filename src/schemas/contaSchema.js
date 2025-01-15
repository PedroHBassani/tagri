const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarContaSchema = Joi.object({
  entidade_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

const atualizarContaSchema = Joi.object({
  id: idSchema,
  entidade_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

module.exports = {
  criarContaSchema,
  atualizarContaSchema,
};

const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarBancoSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  codigo: Joi.number().integer().required(),
});

const atualizarBancoSchema = Joi.object({
  id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
  codigo: Joi.number().integer().required(),
});

module.exports = {
  criarBancoSchema,
  atualizarBancoSchema,
};

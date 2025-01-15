const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarAgenciaSchema = Joi.object({
  banco_id: idSchema,
  codigo: Joi.string().min(2).max(20).required(),
  digito: Joi.string().length(1).required(),
});

const atualizarAgenciaSchema = Joi.object({
  id: idSchema,
  banco_id: idSchema,
  codigo: Joi.string().min(2).max(20).required(),
  digito: Joi.string().length(1).required(),
});

module.exports = {
  criarAgenciaSchema,
  atualizarAgenciaSchema,
};

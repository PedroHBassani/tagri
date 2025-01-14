const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const createEstadoSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  sigla: Joi.string().length(2).required(),
});

const atualizarEstadoSchema = Joi.object({
  id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
  sigla: Joi.string().length(2).required(),
});

module.exports = {
  createEstadoSchema,
  atualizarEstadoSchema
};

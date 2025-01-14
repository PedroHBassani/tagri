const Joi = require("joi");

const createFazendaSchema = Joi.object({
  responsavel_id: Joi.string().required(),
  nome: Joi.string().required(),
});

const updateFazendaSchema = Joi.object({
  id: Joi.number().required(),
  responsavel_id: Joi.string().required(),
  nome: Joi.string().required(),
});

module.exports = {
  createFazendaSchema,
  updateFazendaSchema,
};

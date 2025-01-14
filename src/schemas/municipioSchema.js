const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const createMunicipioSchema = Joi.object({
  estado_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

const atualizarMunicipioSchema = Joi.object({
  id: idSchema,
  estado_id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
});

const listarFe = Joi.object({
  page: Joi.number().min(0).default(0),
  per_page: Joi.number().min(1).default(10),
  filtro_estado_nome: Joi.string().min(2).max(100),
  filtro_nome: Joi.string().min(2).max(100),
});

module.exports = {
  createMunicipioSchema,
  atualizarMunicipioSchema
};

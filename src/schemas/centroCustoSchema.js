const Joi = require("joi");
const { idSchemaOptional, idSchema } = require("./commonSchema");

const criarCentroCustoSchema = Joi.object({
  centro_custo_id: idSchemaOptional,
  nome: Joi.string().required(),
  descricao: Joi.string().optional(),
});

const atualizarCentroCustoSchema = Joi.object({
  id: idSchema,
  centro_custo_id: idSchemaOptional,
  nome: Joi.string().required(),
  descricao: Joi.string().optional(),
});

module.exports = {
  criarCentroCustoSchema,
  atualizarCentroCustoSchema,
};

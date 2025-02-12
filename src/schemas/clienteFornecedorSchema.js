const Joi = require("joi");

const criarClienteFornecedorSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  pessoa_fisica: Joi.object({
    sobrenome: Joi.string().min(2).required(),
    cpf: Joi.string().min(11).max(14).required(),
  }).optional(),
  pessoa_juridica: Joi.object({
    razao_social: Joi.string().min(2).required(),
    cnpj: Joi.string().min(14).max(17).required(),
  }).optional(),
  inscricao_estadual: Joi.string().optional(),
  inscricao_municipal: Joi.string().optional(),
});

module.exports = {
  criarClienteFornecedorSchema,
};

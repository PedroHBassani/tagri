const Joi = require("joi");
const { idSchema } = require("./commonSchema");

const criarFazendaResponsavelSchema = Joi.object({
  nome: Joi.string().min(1).max(255).required(),
  sobrenome: Joi.string().min(1).max(255).required(),
  cpf: Joi.string().min(11).max(14).required(),
});

const atualizarFazendaResponsavelSchema = Joi.object({
  pessoa_id: idSchema,
  nome: Joi.string().min(1).max(255).required(),
  sobrenome: Joi.string().min(1).max(255).required(),
  cpf: Joi.string().min(11).max(14).required(),
});

const pegarFazendaResponsavelSchema = Joi.object({
  pessoa_fisica_id: idSchema,
});

module.exports = {
  criarFazendaResponsavelSchema,
  atualizarFazendaResponsavelSchema,
  pegarFazendaResponsavelSchema,
};

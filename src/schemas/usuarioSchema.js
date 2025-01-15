const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarUsuarioSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  login: Joi.string().min(2).max(100).required(),
  senha: Joi.string().min(6).max(100).required(),
});

const atualizarUsuarioSchema = Joi.object({
  id: idSchema,
  nome: Joi.string().min(2).max(100).required(),
  login: Joi.string().min(2).max(100).required(),
  senha: Joi.string().min(6).max(100).required(),
});

module.exports = {
  criarUsuarioSchema,
  atualizarUsuarioSchema
};

const Joi = require("joi");
const { idSchemaOptional } = require("./commonSchema.js");

const filtarPessoas = Joi.object({
  id: idSchemaOptional,
  nome: Joi.string().min(2).max(100).optional(),
});

module.exports = {
  filtarPessoas,
};

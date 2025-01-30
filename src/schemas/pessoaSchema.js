const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const filtarPessoas = Joi.object({
  id: idSchema.optional(),
  nome: Joi.string().min(2).max(100).optional(),
});

module.exports = {
  filtarPessoas,
};

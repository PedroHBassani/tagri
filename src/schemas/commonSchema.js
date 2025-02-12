const Joi = require("joi");

const idSchema = Joi.number().required();
const idSchemaOptional = Joi.number().optional()

const pegarSchema = Joi.object({
  id: idSchema,
});

module.exports = {
  idSchema,
  idSchemaOptional,
  pegarSchema,
};

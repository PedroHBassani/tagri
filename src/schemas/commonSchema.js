const Joi = require("joi");

const idSchema = Joi.number().required();

const pegarSchema = Joi.object({
  id: idSchema,
});

module.exports = {
  idSchema,
  pegarSchema,
};

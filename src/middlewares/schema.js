const { error } = require("../utils/response.js");

const messages = {
  "any.required": "Erro: O {#param} [{#label}] não foi fornecido.",
  "any.only": "Erro: Os dados {#param} [{#label}] estão incorretos.",
  "array.base": "Erro: O {#param} [{#label}] deve ser uma lista.",
  "array.min": "Erro: O {#param} [{#label}] deve ter no mínimo {#limit} item.",
  "date.base": "Erro: O {#param} [{#label}] deve ser uma data válida.",
  "date.format":
    "Erro: O {#param} [{#label}] deve estar no formato AAAA-MM-DD.",
  "date.min": "Erro: O {#param} [{#label}] deve ser maior que agora.",
  "number.base": "Erro: O {#param} [{#label}] aceita apenas números.",
  "string.base": "Erro: O {#param} [{#label}] aceita apenas letras.",
  "string.email": "Erro: O e-mail fornecido não é válido.",
  "string.length": "Erro: O {#param} [{#label}] deve ter {#limit} caracteres.",
  "string.min":
    "Erro: O {#param} [{#label}] deve ter mais de {#limit} caracteres.",
  "string.max":
    "Erro: O {#param} [{#label}] deve ter menos de {#limit} caracteres.",
  "string.empty": "Erro: O {#param} [{#label}] não pode estar vazio.",
  "number.integer": "Erro: O {#param} [{#label}] deve ser um número inteiro.",
  "number.min": "Erro: O {#param} [{#label}] deve ser maior que {#limit}.",
  "number.max": "Erro: O {#param} [{#label}] deve ser menor que {#limit}.",
  "object.unknown": "Erro: O {#param} [{#label}] não pode ser informado.",
  "object.base": "Erro: O {#param} [{#label}] está no formato errado.",
};

const validateSchema = (schema, type = "body") => {
  return (req, res, next) => {
    try {
      const values = req[type];
      const result = schema.validate(values);
      if (result.error) {
        const { type, context } = result.error.details[0];
        const { label, limit } = context;
        const param = type === "body" ? "field" : "param";

        let errorMessage = messages[type] ?? "Erro: - {#label}";
        if (!messages[type]) {
          console.log(error.details[0]);
        }
        errorMessage = errorMessage
          .replace("{#label}", label)
          .replace("{#limit}", limit)
          .replace("{#param}", param);

        return error(res, errorMessage, 400);
      }
      req[type] = result.value;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = { validateSchema };

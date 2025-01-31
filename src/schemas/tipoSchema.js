const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const tipoSchema = Joi.string().valid(
  "FORMA_PAGAMENTO",
  "PRODUTO_TIPO",
  "PERIODO_AGRICOLA",
  "SISTEMA_MANEJO",
  "PRATICAS_AGRICOLAS",
  "OPERACAO_FORMA_GERAR_NUMERACAO",
  "UNIDADE_MEDIDA"
);

const criarTipoSchema = Joi.object({
  tipo: tipoSchema.required(),
  nome: Joi.string().min(2).max(100).required(),
  descricao: Joi.string().min(2).max(100).default("").optional(),
  chave: Joi.string().min(2).max(100).default("").optional(),
  ordem: Joi.number().default(0).optional(),
});

const atualizarTipoSchema = Joi.object({
  id: idSchema.required(),
  tipo: tipoSchema.required(),
  nome: Joi.string().min(2).max(100).required(),
  descricao: Joi.string().min(2).max(100).default("").optional(),
  chave: Joi.string().min(2).max(100).default("").optional(),
  ordem: Joi.number().default(0).optional(),
});

module.exports = {
  criarTipoSchema,
  atualizarTipoSchema,
};

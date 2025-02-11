const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const criarContasPagarSchema = Joi.object({
  centro_custo_id: idSchema,
  conta_id: idSchema,
  pessoa_id: idSchema,
  quantidade_parcelas: Joi.number().min(1).required(),
  valor_cobrado: Joi.number().min(0).required(),
  data_lancamento: Joi.date().required(),
  data_vencimento_primeira_parcela: Joi.date().required(),
});

const criarComMovimentacaoEstoqueSchema = Joi.object({
  centro_custo_id: idSchema,
  conta_id: idSchema,
  cliente_fornecedor_id: idSchema,
  quantidade_parcelas: Joi.number().min(1).required(),
  data_lancamento: Joi.date().required(),
  data_vencimento_primeira_parcela: Joi.date().required(),
  produtos_comprados: [
    Joi.object({
      produto_id: idSchema,
      estoque_id: idSchema,
      quantidade: Joi.number().min(0).required(),
      valor_cobrado: Joi.number().min(0).required(),
    }),
  ],
});

const listarHistsSchema = Joi.object({
  duplicata_parcela_id: idSchema,
});

const baixarSchema = Joi.object({
  duplicata_parcela_id: idSchema,
  valor_pago: Joi.number().min(0).required(),
  valor_multa: Joi.number().min(0).required(),
  valor_juros: Joi.number().min(0).required(),
  valor_desconto: Joi.number().min(0).required(),
  detalhes: Joi.string().optional(),
  data_movimento: Joi.date().required(),
});

const estornarSchema = Joi.object({
  duplicata_parcela_hist_id_estornar: idSchema,
  detalhes: Joi.string().optional(),
  data_movimento: Joi.date().required(),
});

module.exports = {
  criarContasPagarSchema,
  criarComMovimentacaoEstoqueSchema,
  listarHistsSchema,
  baixarSchema,
  estornarSchema,
};

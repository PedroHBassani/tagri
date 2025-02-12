const Joi = require("joi");
const { idSchema } = require("./commonSchema.js");

const novaSafraSchema = Joi.object({
  fazenda_id: idSchema,
  periodo_agricola_id: idSchema,
  produto_plantado_id: idSchema,
  sistema_manejo_id: idSchema,
  talhao: Joi.string().required(),
  area_ha: Joi.number().min(0).required(),
  data_plantio: Joi.date().optional(),
  data_colheita: Joi.date().optional(),
});

const atualizarSafraSchema = Joi.object({
  id: idSchema,
  fazenda_id: idSchema,
  periodo_agricola_id: idSchema,
  produto_plantado_id: idSchema,
  sistema_manejo_id: idSchema,
  talhao: Joi.string().required(),
  area_ha: Joi.number().min(0).required(),
  data_plantio: Joi.date().optional(),
  data_colheita: Joi.date().optional(),
});

const registrarUsoProdutoSchema = Joi.object({
  safra_id: idSchema,
  pratica_agricola_id: idSchema,
  estoque_id: idSchema,
  produto_id: idSchema,
  descricao: Joi.string().optional(),
  quantidade: Joi.number().min(0).required(),
  data: Joi.date().required(),
});

const atualizarUsoProdutoSchema = Joi.object({
  id: idSchema,
  safra_id: idSchema,
  pratica_agricola_id: idSchema,
  estoque_id: idSchema,
  produto_id: idSchema,
  descricao: Joi.string().optional(),
  quantidade: Joi.number().min(0).required(),
  data: Joi.date().required(),
});

const listarContagemUsoProdutoSchema = Joi.object({
  safra_id: idSchema,
});

const listarProdutosUsadosSchema = Joi.object({
  safra_id: idSchema,
  pratica_agricola_id: idSchema,
});

const registrarResultadoSchema = Joi.object({
  safra_id: idSchema,
  data_colheita: Joi.date().required(),
  peso_colhido: Joi.number().min(0).required(),
});

module.exports = {
  novaSafraSchema,
  atualizarSafraSchema,
  registrarUsoProdutoSchema,
  atualizarUsoProdutoSchema,
  listarContagemUsoProdutoSchema,
  listarProdutosUsadosSchema,
  registrarResultadoSchema,
};

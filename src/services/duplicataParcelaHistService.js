const DuplicataParcelaHist = require("../models/duplicataParcelaHistModel.js");

const Big = require("big.js");

module.exports = {
  async criar({
    duplicata_parcela_id,
    usuario_id,
    valor,
    valor_multa,
    valor_juros,
    valor_desconto,
    tipo_lancamento,
    detalhes,
    data_movimento,
  }) {
    const duplicataParcelaHis = await DuplicataParcelaHist.create({
      duplicata_parcela_id,
      usuario_id,
      valor,
      valor_multa,
      valor_juros,
      valor_desconto,
      tipo_lancamento,
      detalhes,
      data_movimento,
    });
    return duplicataParcelaHis;
  },

  async pegar(id) {
    const duplicataParcelaHist = await DuplicataParcelaHist.findByPk(id);
    return duplicataParcelaHist;
  },

  async atualizar({
    id,
    duplicata_parcela_id,
    usuario_id,
    valor,
    valor_multa,
    valor_juros,
    valor_desconto,
    tipo_lancamento,
    detalhes,
    data_movimento,
  }) {
    const antiga = await DuplicataParcelaHist.findByPk(id);
    if (!antiga) {
      throw new Error("DuplicataParcela não encontrada");
    }

    antiga.duplicata_parcela_id = duplicata_parcela_id;
    antiga.usuario_id = usuario_id;
    antiga.valor = valor;
    antiga.valor_multa = valor_multa;
    antiga.valor_juros = valor_juros;
    antiga.valor_desconto = valor_desconto;
    antiga.tipo_lancamento = tipo_lancamento;
    antiga.detalhes = detalhes;
    antiga.data_movimento = data_movimento;

    await antiga.update();

    return antiga;
  },

  async deletar(id) {
    const duplicataParcelaHist = await DuplicataParcelaHist.findByPk(id);
    if (!duplicataParcelaHist) {
      throw new Error("DuplicataParcelaHist não encontrada");
    }
    await duplicataParcelaHist.destroy();
  },

  async listar_da_parcela(duplicata_parcela_id) {
    const duplicataParcelaHists = await DuplicataParcelaHist.findAll({
      where: { duplicata_parcela_id },
    });
    return duplicataParcelaHists;
  },
};

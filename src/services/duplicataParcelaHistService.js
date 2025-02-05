const DuplicataParcelaHist = require("../models/duplicataParcelaHistModel.js");

const Big = require("big.js");

module.exports = {
  async criar(duplicataParcelaHist) {
    const duplicataParcelaHist = await DuplicataParcelaHist.create(
      duplicataParcelaHist
    );
    return duplicataParcelaHist;
  },

  async pegar(id) {
    const duplicataParcelaHist = await DuplicataParcelaHist.findByPk(id);
    return duplicataParcelaHist;
  },

  async atualizar(id, duplicataParcelaHist) {
    const antiga = await DuplicataParcelaHist.findByPk(id);
    if (!antiga) {
      throw new Error("DuplicataParcela não encontrada");
    }
    await antiga.update(duplicataParcelaHist);
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

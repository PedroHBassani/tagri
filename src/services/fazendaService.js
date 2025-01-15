const Fazenda = require("../models/fazendaModel.js");

module.exports = {
  async criar({ responsavel_id, nome }) {
    const fazenda = await Fazenda.create({ responsavel_id, nome });
    return fazenda;
  },

  async atualizar(fazenda) {
    const antiga = await this.pegar(fazenda.id);
    if (!antiga) {
      throw new Error("Fazenda não encontrada");
    }
    await Fazenda.update(
      { responsavel_id: fazenda.responsavel_id, nome: fazenda.nome },
      {
        where: { id: fazenda.id },
        returning: true,
        plain: true,
      }
    );

    return fazenda;
  },

  async pegar(id) {
    const fazenda = await Fazenda.findByPk(id);
    if (!fazenda) {
      throw new Error("Fazenda não encontrada");
    }
    return fazenda;
  },

  async deletar(id) {
    const fazenda = await Fazenda.destroy({
      where: { id },
    });
    if (!fazenda) {
      throw new Error("Fazenda não encontrada ou não foi deletada");
    }
  },

  async listar() {
    const fazendas = await Fazenda.findAll();
    return fazendas;
  },
};

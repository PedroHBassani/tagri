const Banco = require("../models/bancoModel.js");

module.exports = {
  async criar({nome, codigo}) {
    const banco = await Banco.create({ nome, codigo });
    return banco;
  },
  async pegar(id) {
    const banco = await Banco.findByPk(id);
    if (!banco) {
      throw new Error("Banco não encontrado");
    }
    return banco;
  },
  async listar() {
    const bancos = await Banco.findAll();
    return bancos;
  },

  async atualizar({id, nome, codigo }) {
    const banco = await this.pegar(id);
    if (!banco) {
      throw new Error("Banco não encontrado");
    }
    Banco.update({ nome, codigo }, { where: { id } });
    return banco;
  }

};

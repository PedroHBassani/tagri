const Telefone = require("../models/telefoneModel.js");

module.exports = {
  async criar({ pessoa_id, numero_com_ddd, principal }) {
    const telefone = await Telefone.create({
      pessoa_id,
      numero_com_ddd,
      principal,
      modificado_as: new Date(),
    });
    return telefone;
  },

  async pegar(id) {
    const telefone = await Telefone.findByPk(id);
    return telefone;
  },

  async atualizar({ id, pessoa_id, numero_com_ddd, principal }) {
    const antigo = await this.pegar(id);
    if (!antigo) {
      throw new Error("Telefone não encontrado.");
    }

    antigo.pessoa_id = pessoa_id;
    antigo.numero_com_ddd = numero_com_ddd;
    antigo.principal = principal;
    antigo.modificado_as = new Date();

    await antigo.save();
    return antigo;
  },

  async deletar(id) {
    const telefone = await this.pegar(id);
    if (!telefone) {
      throw new Error("Telefone não encontrado.");
    }
    await telefone.destroy();
    return;
  },

  async pegar_pelo_numero_pessoa_id(pessoa_id, numero_com_ddd) {
    const query = {
      where: {
        pessoa_id,
        numero_com_ddd,
      },
    };
    const telefones = await Telefone.findAll(query);
    return telefones;
  },
};

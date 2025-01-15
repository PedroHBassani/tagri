const Agencia = require("../models/agenciaModel.js");

module.exports = {
  async criar({ banco_id, codigo, digito }) {
    const agencia = await Agencia.create({ banco_id, codigo, digito });
    return agencia;
  },

  async atualizar(agencia) {
    const antiga = await this.pegar(agencia.id);
    if (!antiga) {
      throw new Error("Agência não encontrada");
    }
    await Agencia.update(
      { banco_id: agencia.banco_id, codigo: agencia.codigo, digito: agencia.digito },
      { where: { id: agencia.id } }
    );
    return agencia;
  },

  async pegar(id) {
    const agencia = await Agencia.findByPk(id);
    if (!agencia) {
      throw new Error("Agência não encontrada");
    }
    return agencia;
  },

  async listar() {
    const agencias = await Agencia.findAll();
    return agencias;
  }
};

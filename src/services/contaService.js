const Conta = require("../models/contaModel.js");

module.exports = {
  async criar({ entidade_id, nome }) {
    const conta = await Conta.create({ entidade_id, nome });
    return conta;
  },

  async atualizar(conta) {
    const antiga = this.pegar(conta.id);
    if (!antiga) {
      throw new Error("Conta não encontrada");
    }
    await Conta.update(conta, { where: { id: conta.id } });
    return conta;
  },

  async pegar(id) {
    return await Conta.findByPk(id);
  },

  async listar_da_entidade(entidade_id) {
    return await Conta.findAll({ where: { entidade_id } });
  },

  async deletar(id) {
    const conta = await this.pegar(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    // TODO: validar se tem conta bancária associada
    // TODO: validar se tem duplicatas associadas

    await Conta.update({ deletado_as: new Date() }, { where: { id } });
  },
};

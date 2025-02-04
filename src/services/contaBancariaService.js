const ContaBancaria = require("../models/contaModel.js");

module.exports = {
  async criar({ entidade_id, conta_id, agencia_id, numero, digito }) {
    const contaBancaria = await ContaBancaria.create({
      entidade_id,
      conta_id,
      agencia_id,
      numero,
      digito,
    });
    return contaBancaria;
  },

  async pegar(id) {
    const contaBancaria = ContaBancaria.findByPk(id);
    return contaBancaria;
  },

  async atualizar({ id, entidade_id, conta_id, agencia_id, numero, digito }) {
    const contaBancaria = await this.pegar(id);
    if (!contaBancaria) throw new Error("Conta bancaria não encontrada");

    contaBancaria.entidade_id = entidade_id;
    contaBancaria.conta_id = conta_id;
    contaBancaria.agencia_id = agencia_id;
    contaBancaria.numero = numero;
    contaBancaria.digito = digito;

    await contaBancaria.save();
    return contaBancaria;
  },

  async deletar(id) {
    const contaBancaria = await this.pegar(id);
    if (!contaBancaria) throw new Error("Conta bancaria não encontrada");
    await contaBancaria.destroy();
  },

  async tem_lancamento_envolvenco_conta(conta_id) {
    const query = {
      where: {
        conta_id,
      },
    };
    const contasBancarias = await ContaBancaria.findAll(query);
    return contasBancarias;
  },

  async listar() {
    const contas = await ContaBancaria.findAll();
    return contas;
  },
};

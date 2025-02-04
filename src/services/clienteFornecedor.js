const ClienteFornecedor = require("../models/clienteFornecedorModel.js");

module.exports = {
  async criar({ pessoa_id, inscricao_estadual, inscricao_municipal }) {
    const clienteFornecedor = await ClienteFornecedor.create({
      pessoa_id,
      inscricao_estadual,
      inscricao_municipal,
    });
    return clienteFornecedor;
  },
  async pegar(id) {
    const clienteFornecedor = await ClienteFornecedor.findByPk(id);
    return clienteFornecedor;
  },

  async atualizar({ id, pessoa_id, inscricao_estadual, inscricao_municipal }) {
    const clienteFornecedor = await this.pegar(id);
    if (!clienteFornecedor) throw new Error("ClienteFornecedor não encontrado");

    clienteFornecedor.pessoa_id = pessoa_id;
    clienteFornecedor.inscricao_estadual = inscricao_estadual;
    clienteFornecedor.inscricao_municipal = inscricao_municipal;

    await clienteFornecedor.save();
    return clienteFornecedor;
  },

  async deletar(id) {
    const clienteFornecedor = await this.pegar(id);
    if (!clienteFornecedor) throw new Error("ClienteFornecedor não encontrado");

    await clienteFornecedor.destroy();
  },

  async listar() {
    const clienteFornecedores = await ClienteFornecedor.findAll();
    return clienteFornecedores;
  },

  async pegar_pela_pessoa_id(pessoa_id) {
    const query = {
      where: {
        pessoa_id,
      },
    };
    const clienteFornecedor = await ClienteFornecedor.findAll(query);
    return clienteFornecedor;
  },
};

const Estado = require("../models/estadoModel.js");
const { pegar, atualizar } = require("./municipioService.js");

module.exports = {
  async criar({ nome, sigla }) {
    const estado = await Estado.create({ nome, sigla });
    return estado;
  },
  
  async pegar(id) {
    const estado = await Estado.findByPk(id);
    if (!estado) {
      throw new Error("Estado não encontrado");
    }
    return estado;
  },

  async atualizar(estado) {
    const antigo = await Estado.findByPk(estado.id);
    if (!antigo) {
      throw new Error("Estado não encontrado");
    }
    await Estado.update(
      {
        nome: estado.nome,
        sigla: estado.sigla,
      },
      { where: { id: estado.id }, returning: true }
    );

    return estado;
  },

  async listar() {
    const estados = await Estado.findAll();
    return estados;
  }
};

const Fazenda = require("../models/fazendaModel.js");

module.exports = {
  async criar({ responsavel_id, nome }) {
    try {
      const fazenda = await Fazenda.create({ responsavel_id, nome });
      return fazenda;
    } catch (error) {
      throw new Error("Erro ao criar a fazenda: " + error.message);
    }
  },

  async atualizar({ id, responsavel_id, nome }) {
    try {
      const fazenda = await Fazenda.update(
        { responsavel_id, nome },
        {
          where: { id },
          returning: true,
          plain: true,
        }
      );

      if (fazenda[0] === 0) {
        throw new Error("Fazenda não encontrada ou não foi atualizada");
      }

      return fazenda[1];
    } catch (error) {
      throw new Error("Erro ao atualizar a fazenda: " + error.message);
    }
  },

  async pegar(id) {
    try {
      const fazenda = await Fazenda.findByPk(id);
      if (!fazenda) {
        throw new Error("Fazenda não encontrada");
      }
      return fazenda;
    } catch (error) {
      throw new Error("Erro ao buscar a fazenda: " + error.message);
    }
  },

  async deletar(id) {
    try {
      const fazenda = await Fazenda.destroy({
        where: { id },
      });
      if (!fazenda) {
        throw new Error("Fazenda não encontrada ou não foi deletada");
      }
    } catch (error) {
      throw new Error("Erro ao deletar a fazenda: " + error.message);
    }
  },

  async listar() {
    try {
      const fazendas = await Fazenda.findAll();
      return fazendas;
    } catch (error) {
      throw new Error("Erro ao listar as fazendas: " + error.message);
    }
  },
};

const Estado = require("../models/estadoModel.js");
const Municipio = require("../models/municipioModel.js");
const { Sequelize } = require("sequelize");

module.exports = {
  async criar({ estado_id, nome }) {
    const municipio = await Municipio.create({ estado_id, nome });
    return municipio;
  },

  async pegar(id) {
    const municipio = await Municipio.findByPk(id);
    if (!municipio) {
      throw new Error("Municipio não encontrado");
    }
    return municipio;
  },

  async atualizar(municipio) {
    const antigo = await Municipio.findByPk(municipio.id);
    if (!antigo) {
      throw new Error("Municipio não encontrado");
    }
    await Municipio.update(
      {
        estado_id: municipio.estado_id,
        nome: municipio.nome,
      },
      { where: { id: municipio.id }, returning: true }
    );

    return municipio;
  },

  async listarFe(page, perPage, filtroEstadoNome, filtroNome) {
    const query = {};
    const estadoQuery = {};

    if (filtroNome) {
      query.nome = {
        [Sequelize.Op.like]: `%${filtroNome}%`,
      };
    }

    if (filtroEstadoNome) {
      estadoQuery.nome = {
        [Sequelize.Op.like]: `%${filtroEstadoNome}%`,
      };
    }

    const municipios = await Municipio.findAndCountAll({
      include: [
        {
          model: Estado,
          as: "estado",
          where: estadoQuery,
        },
      ],
      where: query,
      limit: parseInt(perPage, 10),
      offset: parseInt(page, 10) * parseInt(perPage, 10),
    });

    return municipios;
  },
};

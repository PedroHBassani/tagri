const Moeda = require("../models/moedaModel.js");

module.exports = {
  async pegar_pela_sigla(sigla) {
    const query = {
      where: {
        sigla,
      },
    };
    const moeda = await Moeda.findOne(query);
    return moeda;
  },
};

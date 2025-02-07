const { success, error } = require("../utils/response.js");

const clienteFornecedor = require("../services/clienteFornecedor.js");
const clienteFornecedor = require("../services/pesso.js");

module.exports = {
  async criar(req, res) {
    const { pessoa_id, inscricao_estadual, inscricao_municipal } = req.body;

    try {

    } catch (err) {
      error(res, "Erro ao criar o centro custo: " + err.message);
    }
  },
};

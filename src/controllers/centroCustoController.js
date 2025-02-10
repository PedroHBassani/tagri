const { success, error } = require("../utils/response.js");
const centroCustoService = require("../services/centroCustoService.js");

module.exports = {
  async criar(req, res) {
    const { entidade_id, centro_custo_id, nome, descricao } = req.body;

    try {
      const centroCusto = await centroCustoService.criar({
        entidade_id,
        centro_custo_id,
        nome,
        descricao,
      });
      success(res, "", centroCusto);
    } catch (err) {
      error(res, "Erro ao criar o centro custo: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const centroCusto = await centroCustoService.pegar(id);
      success(res, "", centroCusto);
    } catch (err) {
      error(res, "Erro ao pegar o centro custo: " + err.message);
    }
  },

  async atualizar(req, res) {
    const { id, entidade_id, centro_custo_id, nome, descricao } = req.body;
    try {
      const centroCusto = await centroCustoService.atualizar({
        id,
        entidade_id,
        centro_custo_id,
        nome,
        descricao,
      });
      success(res, "", centroCusto);
    } catch (err) {
      error(res, "Erro ao atualizar o centro custo: " + err.message);
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await centroCustoService.deletar(id);
      success(res, "Registro deletado com sucesso!");
    } catch (err) {
      error(res, "Erro ao atualizar o centro custo: " + err.message);
    }
  },

  async listar() {
    try {
      const centrosCustos = await centroCustoService.listar_da_entidade(req.user.entidade);
      success(res, "", centrosCustos);
    } catch (err) {
      error(res, "Erro ao listar os centros custos: " + err.message);
    }
  },
};

const duplicataHandlers = require("../handlers/duplicataHandlers.js");
const duplicataService = require("../services/duplicadaService.js");
const duplicataParcelaService = require("../services/duplicataParcelaService.js");
const clienteFornecedorService = require("../services/clienteFornecedorService.js");

const { success, error } = require("../utils/response.js");
const duplicataParcelaHistService = require("../services/duplicataParcelaHistService.js");

module.exports = {
  async criar(req, res) {
    const {
      centro_custo_id,
      entidade_id,
      conta_id,
      pessoa_id,
      usuario_id,
      quantidade_parcelas,
      valor_cobrado,
      sinal,
      data_lancamento,
      data_vencimento_primeira_parcela,
    } = req.body;

    try {
      const duplicata = await duplicataHandlers.salvar_duplicata_e_parcelas({
        centro_custo_id: centro_custo_id,
        entidade_id: entidade_id,
        conta_id: conta_id,
        pessoa_id: pessoa_id,
        cliente_fornecedor_id: null,
        usuario_id: usuario_id,
        quantidade_parcelas: quantidade_parcelas,
        valor_cobrado: valor_cobrado,
        sinal: sinal,
        data_lancamento: data_lancamento,
        data_vencimento_primeira_parcela: data_vencimento_primeira_parcela,
        produtos: null,
      });
      success(res, "", duplicata);
    } catch (err) {
      error(res, "Erro ao criar a conta pagar: " + err.message);
    }
  },

  async pegar(req, res) {
    const { duplicata_parcela_id } = req.query;

    try {
      const duplicata = await duplicataService.pegar(duplicata_parcela_id);
      success(res, "", duplicata);
    } catch (err) {
      error(res, "Erro ao pegar a parcela conta a pagar: " + err.message);
    }
  },

  async listar(req, res) {
    try {
      const duplicatas = await duplicataService.listar_da_entidade(
        req.user.entidade
      );
      success(res, "", duplicatas);
    } catch (err) {
      error(res, "Erro ao listar as contas a pagar: " + err.message);
    }
  },

  async criar_com_movimentacao_estoque(req, res) {
    const {
      centro_custo_id,
      conta_id,
      cliente_fornecedor_id,
      quantidade_parcelas,
      data_lancamento,
      data_vencimento_primeira_parcela,
      produtos_comprados,
    } = req.body;

    try {
      var valor_cobrado = new Big(0);
      for (var produto in info.produtos) {
        valor_cobrado += produto.valor_cobrado;
      }

      var cliente_fornecedor = await clienteFornecedorService.pegar(
        cliente_fornecedor_id
      );
      const duplicata = await duplicataHandlers.salvar_duplicata_e_parcelas({
        centro_custo_id: centro_custo_id,
        entidade_id: entidade_id,
        conta_id: conta_id,
        pessoa_id: cliente_fornecedor.pessoa_id,
        cliente_fornecedor_id: cliente_fornecedor_id ?? null,
        usuario_id: usuario_id,
        quantidade_parcelas: quantidade_parcelas,
        valor_cobrado,
        sinal: sinal,
        data_lancamento: data_lancamento,
        data_vencimento_primeira_parcela: data_vencimento_primeira_parcela,
        produtos: produtos_comprados ?? null,
      });
      success(res, "", duplicata);
    } catch (err) {
      error(res, "Erro ao criar movimentacao estoque: " + err.message);
    }
  },

  async listar_hists(req, res) {
    const { duplicata_parcela_id } = req.query;
    try {
      const hists = await duplicataParcelaHistService.listar_da_parcela(
        duplicata_parcela_id
      );
      success(res, "", hists);
    } catch (err) {
      error(res, "Erro ao criar movimentacao estoque: " + err.message);
    }
  },

  // TODO: função baixar
  // TODO: função estornar
};

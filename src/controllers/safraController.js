const safraService = require("../services/safraService.js");
const safraUsoProdutoService = require("../services/safraUsoProdutoService.js");
const estoqueProdutoService = require("../services/estoqueProdutoService.js");
const tipoService = require("../services/tipoService.js");

const { success, error } = require("../utils/response.js");

module.exports = {
  async criar(req, res) {
    const {
      fazenda_id,
      periodo_agricola_id,
      produto_plantado_id,
      sistema_manejo_id,
      talhao,
      area_ha,
      data_plantio,
      data_colheita,
    } = req.body;

    try {
      const safra = await safraService.criar({
        entidade_id: req.user.entidade,
        fazenda_id,
        periodo_agricola_id,
        produto_plantado_id,
        sistema_manejo_id,
        talhao,
        area_ha,
        data_plantio,
        data_colheita,
      });
      success(res, "", safra);
    } catch (err) {
      error(res, "Erro ao criar a safra: " + err.message);
    }
  },

  async criar(req, res) {
    const {
      id,
      fazenda_id,
      periodo_agricola_id,
      produto_plantado_id,
      sistema_manejo_id,
      talhao,
      area_ha,
      data_plantio,
      data_colheita,
    } = req.body;

    try {
      const safra = await safraService.criar({
        id,
        entidade_id: req.user.entidade,
        fazenda_id,
        periodo_agricola_id,
        produto_plantado_id,
        sistema_manejo_id,
        talhao,
        area_ha,
        data_plantio,
        data_colheita,
      });
      success(res, "", safra);
    } catch (err) {
      error(res, "Erro ao atualizar a safra: " + err.message);
    }
  },

  async pegar(req, res) {
    const { id } = req.params;
    try {
      const safra = await safraService.pegar(id);
      success(res, "", safra);
    } catch (err) {
      error(res, "Erro ao pegar a safra: " + err.message);
    }
  },

  async registrar_uso_produto(req, res) {
    const {
      safra_id,
      pratica_agricola_id,
      estoque_id,
      produto_id,
      descricao,
      quantidade,
      data,
    } = req.body;

    try {
      const lancamento_baixa_estoque = await estoqueProdutoService.criar({
        estoque_id,
        produto_id,
        quantidade,
        data,
        sinal: -1,
        lancamento_manual: false,
      });

      const produto = await safraUsoProdutoService.criar({
        safra_id,
        pratica_agricola_id,
        lancamento_baixa_estoque_id: lancamento_baixa_estoque.id,
        descricao,
      });
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao registrar uso produto da safra: " + err.message);
    }
  },

  async pegar_uso_produto(req, res) {
    const { id } = req.params;

    try {
      const produto = await safraUsoProdutoService.pegar(id);
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao pegar uso produto da safra: " + err.message);
    }
  },

  async atualizar_uso_produto(req, res) {
    const {
      id,
      safra_id,
      pratica_agricola_id,
      estoque_id,
      produto_id,
      descricao,
      quantidade,
      data,
    } = req.params;

    try {
      const uso_produto = await safraUsoProdutoService.pegar(id);
      const [, produto] = await Promise.all([
        await estoqueProdutoService.atualizar({
          id: uso_produto.lancamento_baixa_estoque_id,
          estoque_id,
          produto_id,
          quantidade,
          data,
          sinal: -1,
          lancamento_manual: false,
        }),

        await safraUsoProdutoService.atualizar({
          id,
          safra_id,
          pratica_agricola_id,
          lancamento_baixa_estoque_id: uso_produto.lancamento_baixa_estoque_id,
          descricao,
        }),
      ]);
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao atualizar uso produto da safra: " + err.message);
    }
  },

  async deletar_uso_produto(req, res) {
    const { id } = req.params;
    try {
      await safraUsoProdutoService.deletar(id);
      success(res, "", produto);
    } catch (err) {
      error(res, "Erro ao deletar uso produto da safra: " + err.message);
    }
  },

  async listar_contagem_uso_produto_por_periodo_agricola(req, res) {
    const { safra_id } = req.params;
    try {
      const usoProdutos =
        await safraUsoProdutoService.contagem_por_pratica_agricola(safra_id);
      success(res, "", usoProdutos);
    } catch (err) {
      error(res, "Erro ao listar uso de produtos da safra: " + err.message);
    }
  },

  async listar_periodo_agricolas(req, res) {
    try {
      const tipos = await tipoService.pegarPelaChaveOuTipo(
        "PERIODO_AGRICOLA",
        null
      );
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao listar periodo agricola: " + err.message);
    }
  },

  async listar_sistemas_manejo(req, res) {
    try {
      const tipos = await tipoService.pegarPelaChaveOuTipo(
        "SISTEMA_MANEJO",
        null
      );
      success(res, "", tipos);
    } catch (err) {
      error(res, "Erro ao listar periodo agricola: " + err.message);
    }
  },

  async listar_produtos_usados_atravez_da_pratica_agricola(req, res) {
    const { safra_id, pratica_agricola_id } = req.body;
    try {
      const produtos = await safraUsoProdutoService.listar_fe(
        safra_id,
        pratica_agricola_id
      );
      success(res, "", produtos);
    } catch (err) {
      error(res, "Erro ao listar produtos utilizados: " + err.message);
    }
  },

  async registrar_resultado(req, res) {
    const { safra_id, peso_colhido, data_colheita } = req.body;
    try {
      await safraService.atualizar_peso_colhido(
        safra_id,
        peso_colhido,
        data_colheita
      );
      success(res, "Registro atualizado com sucesso", {});
    } catch (err) {
      error(res, "Erro ao registrar resultados: " + err.message);
    }
  },
};

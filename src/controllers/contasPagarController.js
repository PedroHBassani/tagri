const duplicataHandlers = require("../handlers/duplicataHandlers.js");
const duplicataService = require("../services/duplicadaService.js");
const duplicataParcelaService = require("../services/duplicataParcelaService.js");
const clienteFornecedorService = require("../services/clienteFornecedorService.js");

const { success, error } = require("../utils/response.js");
const duplicataParcelaHistService = require("../services/duplicataParcelaHistService.js");
const duplicataDetalhesService = require("../services/duplicataDetalhesService.js");
const estoqueProdutoService = require("../services/estoqueProdutoService.js");

module.exports = {
  async criar(req, res) {
    const {
      centro_custo_id,
      conta_id,
      pessoa_id,
      quantidade_parcelas,
      valor_cobrado,
      data_lancamento,
      data_vencimento_primeira_parcela,
    } = req.body;

    try {
      const duplicata = await duplicataHandlers.salvar_duplicata_e_parcelas({
        centro_custo_id,
        entidade_id: req.user.entidade,
        conta_id,
        pessoa_id,
        cliente_fornecedor_id: null,
        usuario_id: req.user.usuario_id,
        quantidade_parcelas,
        valor_cobrado,
        sinal: -1,
        data_lancamento,
        data_vencimento_primeira_parcela,
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
      const duplicata = await duplicataParcelaService.pegar(
        duplicata_parcela_id
      );
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
        centro_custo_id,
        entidade_id: req.user.entidade,
        conta_id: conta_id,
        pessoa_id: cliente_fornecedor.pessoa_id,
        cliente_fornecedor_id: cliente_fornecedor_id ?? null,
        usuario_id: req.user.usuario_id,
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

  async baixar(req, res) {
    const {
      duplicata_parcela_id,
      valor_pago,
      valor_multa,
      valor_juros,
      valor_desconto,
      detalhes,
      data_movimento,
    } = req.body;
    try {
      // Para realizar a baixar é preciso:
      // 1 - Criar uma Hist de baixa
      // 2 - Atualizar os valores e status na parcela
      // 3 - Atualizar os valores e status na duplicata

      const [parcela, hist] = await Promise.all([
        await duplicataParcelaService.pegar(duplicata_parcela_id),
        await duplicataParcelaHistService.criar({
          duplicata_parcela_id,
          usuario_id: req.user.usuario_id,
          valor_pago,
          valor_multa,
          valor_juros,
          valor_desconto,
          tipo_lancamento: "B",
          detalhes,
          data_movimento,
        }),
      ]);

      await Promise.all([
        await duplicataParcelaService.atualizar_valores_e_status(
          duplicata_parcela_id
        ),
        await duplicataParcelaService.atualizar_valores_e_status(
          parcela.duplicata_id
        ),
      ]);

      success(res, "Parcela baixada com sucesso!", hist);
    } catch (err) {
      error(res, "Erro ao baixar parcela: " + err.message);
    }
  },
  async estornar(req, res) {
    const { duplicata_parcela_hist_id_estornar, detalhes, data_movimento } =
      req.body;

    // Para realizar o estorno é preciso:
    // 1 - Criar uma Hist de estorno
    // 2 - Atualizar os valores e status na parcela
    // 3 - Atualizar os valores e status na duplicata
    // 4 - Se a duplicata for estornada por completo e ela tem produtos vinculados, remover as movimentações no estoque

    try {
      const hist_estornar = await duplicataParcelaHistService.pegar(
        duplicata_parcela_hist_id_estornar
      );

      const [hist, parcela] = await Promise.all([
        await duplicataParcelaHistService.criar({
          duplicata_parcela_id: hist_estornar.duplicata_parcela_id,
          usuario_id: req.user.usuario_id,
          valor: hist_estornar.valor,
          valor_multa: hist_estornar.valor_multa,
          valor_juros: hist_estornar.valor_juros,
          valor_desconto: hist_estornar.valor_desconto,
          tipo_lancamento: "E",
          detalhes,
          data_movimento,
        }),
        await duplicataParcelaService.atualizar_valores_e_status(
          hist_estornar.duplicata_parcela_id
        ),
      ]);

      const duplicata =
        await duplicataParcelaService.atualizar_valores_e_status(
          parcela.duplicata_id
        );

      if (duplicata.status == "E") {
        const detalhes = await duplicataDetalhesService.listar_da_duplicata(
          duplicata.id
        );
        const detalhe_ids = [];
        for (var detalhe in detalhes) {
          detalhe_ids.push(detalhe.id);
        }

        if (detalhe_ids.length > 0) {
          await estoqueProdutoService.deletar_pelo_duplica_detalhe_ids(
            detalhe_ids
          );
        }
      }

      success(res, "Parcela estornada com sucesso!", hist);
    } catch (err) {
      error(res, "Erro ao estornar parcela: " + err.message);
    }
  },
};

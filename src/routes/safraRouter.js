const express = require("express");
const safraController = require("../controllers/safraController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  novaSafraSchema,
  atualizarSafraSchema,
  registrarUsoProdutoSchema,
  atualizarUsoProdutoSchema,
  listarContagemUsoProdutoSchema,
  listarProdutosUsadosSchema,
  registrarResultadoSchema,
} = require("../schemas/safraSchema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");

const safraRouter = express.Router();

safraRouter.post("/", validateSchema(novaSafraSchema), safraController.criar);
safraRouter.post(
  "/uso-produto",
  validateSchema(registrarUsoProdutoSchema),
  safraController.registrar_uso_produto
);
safraRouter.post(
  "/resultado",
  validateSchema(registrarResultadoSchema),
  safraController.registrar_resultado
);

safraRouter.put(
  "/",
  validateSchema(atualizarSafraSchema),
  safraController.atualizar
);
safraRouter.put(
  "/uso-produto",
  validateSchema(atualizarUsoProdutoSchema),
  safraController.atualizar_uso_produto
);

safraRouter.get(
  "/:id",
  validateSchema(pegarSchema, "params"),
  safraController.pegar
);
safraRouter.get(
  "/uso-produto/:id",
  validateSchema(pegarSchema, "params"),
  safraController.pegar_uso_produto
);
safraRouter.get(
  "/:safra_id/periodo-agricolas/contagem-usos-produtos",
  validateSchema(listarContagemUsoProdutoSchema, "params"),
  safraController.listar_contagem_uso_produto_por_periodo_agricola
);
safraRouter.get("/periodo-agricolas", safraController.listar_periodo_agricolas);
safraRouter.get("/sistemas-manejo", safraController.listar_sistemas_manejo);
safraRouter.get(
  "/:safra_id/uso-produto/:pratica_agricola_id",
  validateSchema(listarProdutosUsadosSchema),
  safraController.listar_produtos_usados_atravez_da_pratica_agricola
);

safraRouter.delete(
  "/uso-produto/:id",
  validateSchema(pegarSchema, "params"),
  safraController.deletar_uso_produto
);

module.exports = safraRouter;

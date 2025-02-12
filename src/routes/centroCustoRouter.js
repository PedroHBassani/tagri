const express = require("express");
const centroCustoController = require("../controllers/centroCustoController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");
const {
  criarCentroCustoSchema,
  atualizarCentroCustoSchema,
} = require("../schemas/centroCustoSchema.js");

const centroCustoRouter = express.Router();

centroCustoRouter.post(
  "/",
  validateSchema(criarCentroCustoSchema),
  centroCustoController.criar
);

centroCustoRouter.put(
  "/",
  validateSchema(atualizarCentroCustoSchema),
  centroCustoController.atualizar
);

centroCustoRouter.get(
  "/:id",
  validateSchema(pegarSchema, "params"),
  centroCustoController.pegar
);

// Apenas a letra s para ficar de acordo com o padrão do antigo projeto, no qual a rota é /centro-custos
centroCustoRouter.get("s", centroCustoController.listar);

centroCustoRouter.delete(
  "/:id",
  validateSchema(pegarSchema, "params"),
  centroCustoController.deletar
);

module.exports = centroCustoRouter;

const express = require("express");
const contaController = require("../controllers/contaController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarContaSchema,
  atualizarContaSchema,
} = require("../schemas/contaSchema.js");

const contaRouter = express.Router();

contaRouter.post("/", validateSchema(criarContaSchema), contaController.criar);

contaRouter.put(
  "/",
  validateSchema(atualizarContaSchema),
  contaController.atualizar
);

contaRouter.get("/:id", contaController.pegar);
contaRouter.get("/", contaController.listar_da_entidade);

contaRouter.delete("/:id", contaController.deletar);

module.exports = contaRouter;

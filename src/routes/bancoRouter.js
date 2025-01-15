const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const {
  criarBancoSchema,
  atualizarBancoSchema,
} = require("../schemas/bancoSchema.js");
const bancoController = require("../controllers/bancoController.js");

const bancoRouter = express.Router();

bancoRouter.post("/", validateSchema(criarBancoSchema), bancoController.criar);

bancoRouter.put(
  "/",
  validateSchema(atualizarBancoSchema),
  bancoController.atualizar
);

bancoRouter.get("/", bancoController.listar);
bancoRouter.get("/:id", bancoController.pegar);

module.exports = bancoRouter;

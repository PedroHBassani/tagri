const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const tipoController = require("../controllers/tipoController.js");
const {
  criarTipoSchema,
  atualizarTipoSchema,
} = require("../schemas/tipoSchema.js");

const tipoRouter = express.Router();

tipoRouter.post("/", validateSchema(criarTipoSchema), tipoController.criar);
tipoRouter.get("/", tipoController.listar);
tipoRouter.put(
  "/",
  validateSchema(atualizarTipoSchema),
  tipoController.atualizar
);

module.exports = tipoRouter;

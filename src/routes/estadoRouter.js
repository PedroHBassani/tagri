const express = require("express");
const estadoController = require("../controllers/estadoController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { createEstadoSchema, atualizarEstadoSchema } = require("../schemas/estadoSchema.js");

const estadoRouter = express.Router();

estadoRouter.post(
  "/",
  validateSchema(createEstadoSchema),
  estadoController.criar
);

estadoRouter.put(
  "/",
  validateSchema(atualizarEstadoSchema),
  estadoController.atualizar
);

estadoRouter.get("/:id", estadoController.pegar);
estadoRouter.get("/", estadoController.listar);

module.exports = estadoRouter;

const express = require("express");
const fazendaController = require("../controllers/fazendaController.js");
const { validateSchema } = require("../middlewares/schema.js");
const {
  createFazendaSchema,
  updateFazendaSchema,
} = require("../schemas/fazendaSchema.js");

const fazendaRouter = express.Router();

fazendaRouter.post(
  "/",
  validateSchema(createFazendaSchema),
  fazendaController.criar
);
fazendaRouter.put(
  "/",
  validateSchema(updateFazendaSchema),
  fazendaController.atualizar
);
fazendaRouter.get("/:id", fazendaController.pegar);
fazendaRouter.delete("/:id", fazendaController.deletar);
fazendaRouter.get("/", fazendaController.listar);

module.exports = fazendaRouter;

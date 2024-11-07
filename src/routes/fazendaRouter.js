const express = require("express");
const fazendaController = require("../controllers/fazendaController.js");

const fazendaRouter = express.Router();

fazendaRouter.post("/fazenda", fazendaController.criar);
fazendaRouter.put("/fazenda", fazendaController.atualizar);
fazendaRouter.get("/fazenda/:id", fazendaController.pegar);
fazendaRouter.delete("/fazenda/:id", fazendaController.deletar);
fazendaRouter.get("/fazendas", fazendaController.listar);

module.exports = fazendaRouter;

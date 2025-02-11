const express = require("express");
const praticaAgricolaController = require("../controllers/praticaAgricolaController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");

const praticaAgricolaRouter = express.Router();

praticaAgricolaRouter.get("/", praticaAgricolaController.listar);

praticaAgricolaRouter.get(
  "/:id",
  validateSchema(pegarSchema, "params"),
  praticaAgricolaController.pegar
);

module.exports = praticaAgricolaRouter;

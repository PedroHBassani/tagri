const express = require("express");
const municipioController = require("../controllers/municipioController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { createMunicipioSchema, atualizarMunicipioSchema } = require("../schemas/municipioSchema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");

const municipioRouter = express.Router();

municipioRouter.post(
  "/",
  validateSchema(createMunicipioSchema),
  municipioController.criar
);

municipioRouter.put(
  "/",
  validateSchema(atualizarMunicipioSchema),
  municipioController.atualizar
);


municipioRouter.get("/paginate", municipioController.listarFe);

municipioRouter.get("/:id", 
  validateSchema(pegarSchema, "params"),
  municipioController.pegar
);

module.exports = municipioRouter;

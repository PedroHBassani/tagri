const express = require("express");
const clienteFornecedorController = require("../controllers/clienteFornecedorController.js");
const { validateSchema } = require("../middlewares/schema.js");
const { pegarSchema } = require("../schemas/commonSchema.js");
const { criarClienteFornecedorSchema } = require("../schemas/clienteFornecedorSchema.js");

const clienteFornecedorRouter = express.Router();

// Apenas o s para ficar de acordo com a antiga API.
clienteFornecedorRouter.post(
  "s/",
  validateSchema(criarClienteFornecedorSchema),
  clienteFornecedorController.criar
);

clienteFornecedorRouter.get(
  "/:id",
  validateSchema(pegarSchema, "params"),
  clienteFornecedorController.pegar
);

// clienteFornecedorRouter.get(
//   "s/",
//   clienteFornecedorController.pegar
// );

module.exports = clienteFornecedorRouter;

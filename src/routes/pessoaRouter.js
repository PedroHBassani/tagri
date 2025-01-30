const express = require("express");
const { validateSchema } = require("../middlewares/schema.js");
const { filtarPessoas } = require("../schemas/pessoaSchema.js");
const pessoaController = require("../controllers/pessoaController.js");

const pessoaRouter = express.Router();

pessoaRouter.get("/", validateSchema(filtarPessoas), pessoaController.criar);

module.exports = pessoaRouter;

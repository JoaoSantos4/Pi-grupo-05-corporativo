const express = require("express");
const router = express.Router();

const estoque = require("./estoque");
const relatorios = require("./relatorios");
const pagar = require("./pagar");
const expedicao = require("./expedicao");

router.use("/estoque", estoque);
router.use("/relatorios", relatorios);
router.use("/pagar", pagar);
router.use("/expedicao", expedicao);

module.exports = router;

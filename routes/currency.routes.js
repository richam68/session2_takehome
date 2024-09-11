const express = require("express");
const router = express.Router();
const currencyController = require("../controller/currency.controller");

router.get("/:currency_symbol", currencyController.getCurrencyBySymbol);
router.get("/exchange/currencies", currencyController.exchangeCurrency);
router.get("/convert", currencyController.convertCurrency);
module.exports = router;
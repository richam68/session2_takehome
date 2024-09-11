const currencyJson = require("../currency.json");
console.log("currencyJson", currencyJson);

const getCurrencyBySymbol = async(req, res) => {
    const { currency_symbol } = req.params;
    console.log("currency_symbol", currency_symbol)

    // const { rates } = currencyJson;
    // const rate = rates[currency_symbol];

    // console.log("r", rates);
    const changeJsonIntoArray = Object.keys(currencyJson);
    consolelog("changeJsonIntoArray", changeJsonIntoArray);

    const curr = changeJsonIntoArray.find((ele) => ele.base_code === currency_symbol)
    console.log("curr", curr)
//    if(rate === undefined){
//     res.status(404).send({message: "Enter correct value"});
//    }

   res.status(200).send(curr);
}

const exchangeCurrency = async (req, res) => {
    const changeJsonIntoArray = Object.keys(currencyJson.rates);
try{
    if(changeJsonIntoArray){
    res.status(200).send({data: changeJsonIntoArray});
    }
}catch(error){
    console.error("Error fetching currency data:", error);
    res.status(500).send({message : "The service is currently down, please check again later"})
}
}

const convertCurrency = (req, res) => {

    const {value, currency, to_currency} = req.query;

   //validation
   if(!value || !currency || !to_currency){
    res.status(400).send({message: "Incomplete or Incorrect data passed"})
   }

   if(isNaN(value) || value <= 0){
    return res.status(400).send({ message: "Value should be a non-negative number" });
   }

   if(!currency.length === 3 || !to_currency.length === 3){
    return res.status(400).send({ message: "Currency and to_currency should be 3 letter strings" });
   }

   try{
    const { rates } = currencyJson;
// console.log("conert", rates)
    //check if both currencies are available
    if(!rates[currency] || !rates[to_currency]){
        return res.status(404).send({ message: "Cannot find given currency code" });
    }

     // Perform currency conversion
     const convertedValue = ((value * rates[to_currency]) / rates[currency]);
        console.log("convertedValue", convertedValue)
     res.status(200).send({result: convertedValue})
   }catch(error){
    console.error("Error converting currency:", error);
    res.status(500).send({ message: "The service is currently down, please check again later" });
   }

}

module.exports= {getCurrencyBySymbol, exchangeCurrency, convertCurrency}
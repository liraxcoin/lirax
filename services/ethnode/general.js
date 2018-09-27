module.exports = function (web3) {
  var module = {};

  module.getStatus = async function () {
    var result = {};

    //result.connected = web3.isConnected()
    result.connected = "Connected !";

    //if (web3.isConnected()) {
      // coinbase info
      result.coinbase = "Connected !";
      var bal = web3.eth.getBalance('0x810C448046e40C4D396a31fc6DBFF29Cb20F12A0');
      // bal.then(function(balanceData){
      //   result.coinbase_balance= balanceData;
      //   console.log(balanceData);
      //   console.log(result.coinbase_balance);
      //   return result;
      // });
      result.coinbase_balance = web3.toDecimal(bal);
      return result;
   // }

  };

  return module
};

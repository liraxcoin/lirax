const Web3 = require('web3');
const config = require('./config');

const { eth: { protocol, host, port } } = config;
const nodeUrl = `${protocol}://${host}:${port}`;

// var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/788gkJksgeuI1IeLKTIR"));
var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a1e50c1aa31f485e95586390749939f8"));


// var web3 = require('etherscan-api').init('PQZ69HAQSIEN9WJ9ZSTR83V2SKHKTRSB39','ropsten');
// console.log(web3);

var balance = web3.eth.getBalance('0x057a51f37e01d04bf7ab0625f67e84518a309fa2');
// balance.then(function (bal) {
//     console.log(bal);
// });
console.log(web3.toDecimal(balance));

//function UserAction() {
/* var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(JSON.stringify(response));
//}*/

//var temp ="https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken";






// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
// }
//https://ropsten.infura.io/5Jvp9PlgzsQx3QSuGk1x
module.exports = web3;

/*var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
            
getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0x810c448046e40c4d396a31fc6dbff29cb20f12a0', function (data) {
    var contractABI = "";
    contractABI = JSON.parse(data.result);
    if (contractABI != ''){
        var MyContract = web3.eth.contract(contractABI);
        var myContractInstance = MyContract.at("0x810c448046e40c4d396a31fc6dbff29cb20f12a0");
        var result = myContractInstance.memberId("0x2ca42f9032077e878a70b4a5b3ed28131ed05061");
        console.log("result1 : " + result);            
        var result = myContractInstance.members(1);
        console.log("result2 : " + result);
    } else {
        console.log("Error" );
    }            
});
module.exports = web3*/
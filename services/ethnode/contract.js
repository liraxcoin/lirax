const config = require('../../config');
const Tx = require('ethereumjs-tx');
const bigNumberToString = require('bignumber-to-string')

module.exports = function(web3) {
    var module = {};

    /**114
     * Returns the ABI of a given Contract name
     * @param {string} contractName Name of the Contract to look up in configuration files
     */
    module.getContractAbi = function(contractName) {
        var contractAbi;
        try {
            var abiPath = config.contract[contractName].abi_file;
            abiPath = '../../' + abiPath;
            contractAbi = require(abiPath)
        } catch (err) {
            console.log('Contact ABI load error.');
            console.log(err);
            throw err
        }
        return contractAbi;
    };

    /**
     * Call a Contract method
     * @param {string} contractName Name of the Contract
     * @param {stirng} contractAddress Address of the Contract
     * @param {string} method Method to call
     * @param {array} args Arguments of the method to be called
     */
    module.call = async function(contractName, contractAddress, method, args) {
        return new Promise((resolve, reject) => {
            console.log(args);
            var contractAbi = module.getContractAbi(contractName);

            try {
                var Contract = web3.eth.contract(contractAbi);
                // initiate contract for an address
                var contractInstance = Contract.at(contractAddress);

                var result = contractInstance[method].apply(this, Object.values(args));

                if (method == "_totalSupply") {
                    var result = bigNumberToString(result);
                    return resolve({ value: result })
                } else {
                    return resolve({ value: result })
                }

            } catch (err) {
                console.log('Contract call error.');
                console.log(err);
                reject(err)
            }
        });
    };


    // -----------------------------------------------------------------------

    /**
     * Call a Contract method
     * 
     * @param {stirng} Address Address of the Contract
     * @param {string} method Method to call
     * 
     */
    module.balanceOf = async function(Address, contractData) {
        return new Promise((resolve, reject) => {
            console.log(Address);
            try {
                web3.eth.call({
                    to: Address,
                    data: contractData
                }, function(err, result) {
                    if (result) {
                        var tokens = web3.toBigNumber(result).toString();
                        console.log("tokens-", tokens)
                        var x = web3.fromWei(tokens, "ether")
                        console.log("ether-", x)
                        return resolve({ value: x })
                    } else {
                        console.log("ether-ddddddddddddddddd")
                        console.log(err); // Dump errors here
                        return resolve({ value: err })
                    }
                });
            } catch (err) {
                console.log('Contract call error.');
                console.log(err);
                return resolve({ value: err })
            }
        });
    };


    // --------------------------------------------------------------------------/



    /**
     * Transact with a Contract (broadcasted and impacted in the blockchain)
     * @param {string} contractName Name of the Contract
     * @param {string} contractAddress Address of the Contract
     * @param {string} method Method to call for the transaction
     * @param {string} callerAddress Address of the caller of the transaction
     * @param {string} privateKey Private key of the caller of the transaction, corresponding to the callerAddress
     * @param {array} args Arguments of the method to be called
     */
    module.transact = async function(contractName, contractAddress, method, callerAddress, privateKey, args) {
        return new Promise((resolve, reject) => {
            var result = {};
        //    console.log(args);
         //   console.log("=========method===========")
            //console.log(method)
        //    console.log("========method============")

            var x = web3.toWei(1, "ether");
            // console.log(x)
            console.log("====================")
                // var argss = {

            //     address: args.address,
            //     amount: parseInt(x),
            // };
            var argss = args;
            //  console.log("----------------------------")
            console.log(argss)
            try {
                var contractAbi = module.getContractAbi(contractName);
                // console.log(contractAbi);
                var Contract = web3.eth.contract(contractAbi);
                var contractInstance = Contract.at(contractAddress);
                // initiate contract for an address
                // get the reference to the contract method, with the corresponding parameters
                var methodRef = contractInstance[method].getData.apply(this, Object.values(argss));
                var privateKeyBuff = new Buffer(privateKey, 'hex');
                // get the current gas price, either from config or from the node

                var gasPrice = web3.eth.gasPrice
                // var gasPrice = config.eth.gas_price;
                // if (gasPrice === 'auto') {
                //     gasPrice = web3.eth.gasPrice
                // }
                console.log('gasPrice', web3.toHex(gasPrice));
                
                // get the gas limit from the config (if exists). Otherwise leave "auto"
                var gasLimit = web3.eth.estimateGas({
                    from: callerAddress,
                    to: contractAddress,
                    data: methodRef
                })

                // var gasLimit = config.eth.gas_limit;
                // if (gasLimit !== 'auto') {
                //     // gasLimit = new BigNumber(config.eth.gas_limit);
                //     gasLimit = web3.toHex(config.eth.gas_limit)
                // }
                console.log('gasLimit', gasLimit);
                
                var rawTx = {
                    nonce: web3.toHex(web3.eth.getTransactionCount(callerAddress)),
                    from: callerAddress,
                    to: contractAddress,
                    gasPrice: web3.toHex(gasPrice),
                    gasLimit: web3.toHex(gasLimit*2),
                    // chainId: config.eth.chain_id,
                    data: methodRef,
                    value: 0
                };

                console.log(rawTx)
                    // gasLimit: gasLimit == 'auto' ? 0 : gasLimit, // default gas limit to send ether
                    // 
                    // create the Tx
                var tx = new Tx(rawTx);
                // see the fees required for the Tx
                if (gasLimit === 'auto') {
                    console.log('Auto calculating gas limit...');
                    gasLimit = web3.eth.estimateGas(rawTx);
                    console.log('Estimated gas: ' + gasLimit);
                    tx.gasLimit = 30000;
                }
                // sign the transaction
                tx.sign(privateKeyBuff);
                var serializedTx = tx.serialize();

            } catch (err) {
                console.log('Error preparing the Contract transact Tx.');
                console.log(err);
                reject(err)
            }
            try {
                // no send the signed serialized transaction to the node
                web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
                    if (err) {
                        reject(err)
                    } else {
                        result.tx_hash = txHash;
                        resolve(result)
                    }
                })
            } catch (err) {
                console.log('Contract transact error.');
                console.log(err);
                reject(err)
            }
        });
    };

    return module
};
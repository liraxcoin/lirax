module.exports = function(web3) {
    var module = {};

    module.getBalance = function(address) {
        var promise = new Promise((resolve, reject) => {
            var result = {};
            try {
                result.address = address;
                result.balance = web3.eth.getBalance(address);

                return resolve(result)
            } catch (err) {
                console.log('Error getting address balance.');
                console.log(err);
                return reject(err.message)
            }
        });

        return promise
    };



    // -------------------------------------------
    module.create = function() {
        var promise = new Promise((resolve, reject) => {
            var result = {};
            try {
                // result.address = address;
                // result = web3.eth.accounts.wallet.add('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
                result = web3.eth.accounts.create();
                return resolve(result)
            } catch (err) {
                console.log('Error genrating address .');
                console.log(err);
                return reject(err.message)
            }
        });

        return promise
    };
    // --------------------------------------
    return module
};
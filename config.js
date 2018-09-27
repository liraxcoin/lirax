require('dotenv').config(); // this loads the defined variables from .env

const config = {
    // Ethereum node and operations
    eth: {
        protocol: process.env.ETH_PROTOCOL || 'http',
        host: process.env.ETH_HOST || 'localhost',
        port: parseInt(process.env.ETH_PORT) || 8545,
        chain_id: parseInt(process.env.ETH_CHAIN_ID) || 3,
        gas_price: 1,
        gas_limit: process.env.ETH_GAS_LIMIT || 'auto'
    },
    // HTTP RESTful API
    api: {
        port: parseInt(process.env.APP_PORT) || 3005
    },
    // list of contracts
    contract: {
        'LIRAX': {
            abi_file: 'var/contracts/liras_abi.json'
        },
    }
};

module.exports = config;
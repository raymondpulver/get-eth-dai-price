'use strict';

const DAI_EXCHANGE_ADDRESS = '0x09cabec1ead1c0ba254b09efb3ee13841712be14';

const abi = require('web3-eth-abi');
const encodeFunctionCall = abi.encodeFunctionCall.bind(abi);
const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/mew');
const BN = require('bignumber.js');

const getEthPrice = async () => new BN('10').pow(18).div(new BN((await web3.eth.call({
	to: DAI_EXCHANGE_ADDRESS,
 	data: encodeFunctionCall({
 		name: 'getTokenToEthInputPrice',
 		inputs: [{
 			name: 'tokens_sold',
 			type: 'uint256'
 		}]
 	}, [ '1000000000000000000' ])
})).substr(0, 66))).toString(10);

module.exports = getEthPrice;

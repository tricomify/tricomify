/**
   (c) 2018-2019 T. Hamada
*/

"use strict";
const Web3 = require('web3');
const nByte = 32;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = class CryptoAuth{

  constructor () {
    this.abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
    this.id = require('crypto').randomBytes(nByte).toString('hex');
    this.balance = 0.;
    this.getFromBlockChain();
    this.puts = console.log;
  }

  getId () {
    return (this.id);
  }

  getBalance () {
    return (this.balance);
  }

  updateBalance () {
    this.getFromBlockChain();
    return (this.balance);
  }

  async getFromBlockChain () {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/221466081c6f409e957af37e54287801"));
    const ckSum = (a) => (web3.utils.toChecksumAddress(a));
    const waddr = ckSum("0x5b8dCE0667C0e28F11E2Fa544d78A771cE8AE60B"); // wallet address
    const taddr = ckSum('0x7b3C93596C3e07F8AFd06a1e7aEd3F4fE2EF74B6'); // token address
    const contr = await new web3.eth.Contract(this.abi, taddr);
    const manti = 1. * 10 ** (await contr.methods["decimals"]().call());
    this.balance = (await contr.methods["balanceOf"](ckSum(waddr)).call())/manti;
    return (true);
  };

}

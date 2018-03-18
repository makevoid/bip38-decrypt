'use strict'
const c = console
const fs    = require('fs')
const bip38 = require('bip38')
const wif   = require('wif')
const decrypt   = bip38.decrypt

const keyToWif  = (privateKey) => {
  return wif.encode(0x80, privateKey.privateKey, privateKey.compressed)
}

const bip38PrivateKey = process.env.BIP38_PRIVATE_KEY ||  process.argv[2]
const password        = process.env.PASSWORD || process.argv[3]

if (!bip38PrivateKey) throw new Error("Empty BIP38 private Key, aborting!")
if (!password)        throw new Error("Empty BIP38 password, aborting!")
if (process.env.NODE_ENV != "test") c.log("decrypting private key...") 

module.exports = {
  bip38PrivateKey:  bip38PrivateKey,
  password:         password,
  decrypt:          decrypt,
  keyToWif:         keyToWif,
}

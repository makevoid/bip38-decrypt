'use strict'
const c = console
const fs    = require('fs')
const exists = fs.existsSync
const readFile = fs.readFileSync
const bip38 = require('bip38')
const bip38Decrypt = require('bip38-decrypt')
const wif   = require('wif')
const decrypt   = bip38.decrypt

const keyToWif  = (privateKey) => {
  return wif.encode(0x80, privateKey.privateKey, privateKey.compressed)
}

const bip38PrivateKey = process.env.BIP38_PRIVATE_KEY ||  process.argv[2]
const passwordFile    = process.env.PASSWORD_FILE || process.argv[3] || ".password"

if (!bip38PrivateKey) throw new Error("Empty BIP38 private Key, aborting!")

if (!exists(passwordFile)) throw new Error(`Password file '${passwordFile}' not found, aborting!`)
let password = readFile(passwordFile)
const emptyPasswordError = new Error("Empty BIP38 password, aborting!")
if (!password || password == "") throw emptyPasswordError
password = password.toString().trim()
if (password == "") throw new emptyPasswordError
if (process.env.NODE_ENV != "test") c.log("decrypting private key...")

bip38Decrypt(bip38PrivateKey, password, function(err,decryptedPrivateWif) { console.log(err ? err.msg : "private key: " + decryptedPrivateWif) });

module.exports = {
  bip38PrivateKey:  bip38PrivateKey,
  password:         password,
  decrypt:          decrypt,
  keyToWif:         keyToWif,
}

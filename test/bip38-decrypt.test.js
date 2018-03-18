'use strict'

const bip38PrivateKeyArg = "6PYWpYms78Q3vJPVHvsHFCF1AKtd1PayV9qSeVGV47FtyXWHRJMreWsXYL"
const passwordArg        = "password"

process.env["BIP38_PRIVATE_KEY"] = bip38PrivateKeyArg
process.env["PASSWORD"] = passwordArg

const b38 = require('../bip38-decrypt')
const bip38PrivateKey = b38.bip38PrivateKey
const password = b38.password
const decrypt  = b38.decrypt
const keyToWif = b38.keyToWif

describe('library', () => {

  test('decrypt', () => {
    const privateKeyObject = decrypt(bip38PrivateKey, password)
    const privateKey = privateKeyObject.privateKey.toString('hex')
    expect(privateKey).toEqual(
      "d619682b0ef3dbfa3217ad6b00477e01275edc8ec4a55402b8e3e49aa3230ba8"
    )
  })

  test('keyToWif', () => {
    const privateKey = {
      privateKey: new Buffer("d619682b0ef3dbfa3217ad6b00477e01275edc8ec4a55402b8e3e49aa3230ba8", "hex"),
      compressed: true,
    }
    const privateKeyWIF = keyToWif(privateKey)
    expect(privateKeyWIF).toBe("L4PtgPtsvfnGfBExWNnwoxZW3xeuQYs4cUD3y7WxrkxFjDgJKjeh")
  })

})

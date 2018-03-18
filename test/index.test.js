'use strict'

const bip38PrivateKey = "6PYWpYms78Q3vJPVHvsHFCF1AKtd1PayV9qSeVGV47FtyXWHRJMreWsXYL"
const password        = "password"

const execSync = require('child_process').execSync



describe('CLI', () => {

  const env = `BIP38_PRIVATE_KEY=${bip38PrivateKey} PASSWORD=${password}`
  const outputBuf = execSync(`${env} ./index.js`)
  const output = outputBuf.toString()

  test('decrypts key', () => {
    expect(output).toMatch(/PrivateKey: d619682b0ef3dbfa3217ad6b00477e01275edc8ec4a55402b8e3e49aa3230ba8/)
  })

  test('returns wif key', () => {
    expect(output).toMatch(/PrivateKey: L4PtgPtsvfnGfBExWNnwoxZW3xeuQYs4cUD3y7WxrkxFjDgJKjeh \(WIF\)/)
  })

})

#!/usr/bin/env node
'use strict'

const c = console
const b38 = require('./bip38-decrypt')
const bip38PrivateKey = b38.bip38PrivateKey
const password = b38.password
const decrypt  = b38.decrypt
const keyToWif = b38.keyToWif

const privateKey    = decrypt(bip38PrivateKey, password)
const privateKeyWIF = keyToWif(privateKey)

c.log("PrivateKey:", privateKey.privateKey.toString('hex'))
c.log("PrivateKey:", privateKeyWIF, "(WIF)")

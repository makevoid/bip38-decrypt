#!/usr/bin/env python3

import sys
from pycoin.symbols.btc import network

k = network.parse.private_key(sys.argv[1])
address = k.address()
message = sys.argv[2]
signature = network.msg.sign(k, message)
print("Bitcoin adddress: " + address + " Message: " + message + " Signature: " + signature)

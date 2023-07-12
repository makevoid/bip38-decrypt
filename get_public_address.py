#!/usr/bin/env python3

import sys
from pycoin.symbols.btc import network

k = network.parse.private_key(sys.argv[1])
print(k.address())

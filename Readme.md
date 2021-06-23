# bip38-decrypt

Command line utility to decrypt a BIP38 (encrypted) private key.


### Install

Get this module from npm to have the `bip38d` command installed.

    npm i -g bip38-decrypt


### Usage

Create a password file containing the password for your private key.

    echo "password" > .password
    history -c
    clear

Run the bip38 command passing the encrypted private key as first argument and the password file as the second:

    bip38d 6PYPrivateKey .password


### Example

This example should work successfully, it's the same used in the jest test, this private key is empty and is encrypted with the password `"password"`.

    echo "password" > .password
    bip38d 6PYWpYms78Q3vJPVHvsHFCF1AKtd1PayV9qSeVGV47FtyXWHRJMreWsXYL .password


### Usage with extra script to derive public address

    ./get_public_address.py $(node bip38-decrypt.js 6PYWpYms78Q3vJPVHvsHFCF1AKtd1PayV9qSeVGV47FtyXWHRJMreWsXYL .password )


### Test

This will run the jest test

    npm test


### Issues & contributions

Github Issues & PR!


---

enjoy!

@makevoid

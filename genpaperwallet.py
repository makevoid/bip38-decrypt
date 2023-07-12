#!/usr/bin/env python3

import binascii
from bip_utils import Bip38PubKeyModes, Bip38Encrypter
from bitcoin import *
from qrcode import *
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

k = random_key()
priv = binascii.unhexlify(encode_privkey(k, 'hex'))
addr = privtoaddr(priv)
bip = Bip38Encrypter.EncryptNoEc(priv, sys.argv[1], Bip38PubKeyModes.UNCOMPRESSED)

#print("Unencrypted private key: " + encode_privkey(k, 'wif'))
print("BIP38-encrypted private key: " + bip)
print("Address: " + addr)

# QR-code generation based on https://github.com/decentropy/bip38
img = Image.new('RGB', (1000, 500), color = 'white')
img_w, img_h = img.size
qr = QRCode(box_size=8, border=3, error_correction=ERROR_CORRECT_Q)
qr.add_data(addr)
im = qr.make_image()
im_w, im_h = im.size
qr2 = QRCode(box_size=6, border=3, error_correction=ERROR_CORRECT_M)
qr2.add_data(bip)
im2 = qr2.make_image()
im2_w, im2_h = im2.size
offs = round((img_w - im_w - im2_w) / 4)
img.paste(im, (offs,round((img_h-im_h)/2)) )
img.paste(im2, (im_w+(3*offs),round((img_h-im2_h)/2)) )
draw = ImageDraw.Draw(img)
fcolor =  (0,0,0)
draw.text((im_w+(3*offs),(img_h-im_h)/2-10), 'BIP38 Key', fcolor)
draw.text((20, 70), 'ADDRESS:  ' + addr, fcolor)
draw.text((20, (img_h - 100)), 'BIP38 KEY:  ' + bip, fcolor)
img.save(addr+'.jpg', "JPEG")

print("generated image " + addr+'.jpg')

import { Injectable } from "@angular/core";
import * as bip39 from "bip39";
import * as HDKey from "hdkey";

@Injectable({
  providedIn: "root"
})
export class EncryptService {
  constructor() {}

  encryptPayload(payload, jwkKey) {
    return new Promise((resolve, reject) => {
      this.importKey(jwkKey).then(key => {
        const iv = window.crypto.getRandomValues(new Uint8Array(32));
        window.crypto.subtle
          .encrypt(
            {
              name: "AES-GCM",
              iv
            },
            key,
            new TextEncoder().encode(JSON.stringify(payload))
          )
          .then(cipherText => {
            resolve({
              iv: Buffer.from(iv).toString("hex"),
              cipherText: Buffer.from(cipherText).toString("hex")
            });
          });
      });
    });
  }

  decryptPayload(cipherPayload, jwkKey) {
    return new Promise((resolve, reject) => {
      this.importKey(jwkKey).then(key => {
        window.crypto.subtle
          .decrypt(
            {
              name: "AES-GCM",
              iv: Buffer.from(cipherPayload.iv, "hex")
            },
            key,
            Buffer.from(cipherPayload.cipherText, "hex")
          )
          .then(plainText => {
            resolve(JSON.parse(new TextDecoder().decode(plainText)));
          });
      });
    });
  }
  exportKey(key) {
    return window.crypto.subtle.exportKey("jwk", key);
  }

  importKey(keyData) {
    return window.crypto.subtle.importKey("jwk", keyData, "AES-GCM", true, [
      "encrypt",
      "decrypt"
    ]);
  }

  generateKey() {
    return window.crypto.subtle
      .generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      )
      .then(result => this.exportKey(result));
  }

  encryptWithMnemonic(payload, mnemonic) {
    const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const accountKey = hdkey.derive("m/44'/60'/0'/0");
    return window.crypto.subtle
      .importKey(
        "raw",
        Buffer.from(accountKey.privateKey, "hex"),
        "AES-GCM",
        true,
        ["encrypt", "decrypt"]
      )
      .then(result => this.exportKey(result))
      .then(jwkKey => {
        return this.encryptPayload(payload, jwkKey);
      });
  }

  decryptWithMnemonic(cipherPayload, mnemonic) {
    const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    const accountKey = hdkey.derive("m/44'/60'/0'/0");
    return window.crypto.subtle
      .importKey(
        "raw",
        Buffer.from(accountKey.privateKey, "hex"),
        "AES-GCM",
        true,
        ["encrypt", "decrypt"]
      )
      .then(result => this.exportKey(result))
      .then(jwkKey => {
        return this.decryptPayload(cipherPayload, jwkKey);
      });
  }
}

// generateKey().then((jwkKey) => {
//   console.log("persist this", JSON.stringify(jwkKey))
//   let payload = {
//       a: 1,
//       b: 3,
//       c: 4
//   }
//   encryptPayload(payload, jwkKey).then((cipherPayload) => {
//       console.log("persist this", cipherPayload)
//       decryptPayload(cipherPayload, jwkKey).then(console.log)
//   })
// })
// const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(MNEMONIC))
// const accountKey = hdkey.derive("m/44'/60'/0'/0")
// console.log(Buffer.from(accountKey.privateKey, 'hex'))
// let payload = {
//   a: 1,
//   b: 3,
//   c: 4
// }
// encryptWithMnemonic(payload, MNEMONIC).then((cipherPayload) => {
//   console.log("persist this", cipherPayload)
//   decryptWithMnemonic(cipherPayload, MNEMONIC).then(console.log)
// })
/*
var A = ec.keyFromSecret(accountKey.privateKey);
var B = ec.genKeyPair();
var C = ec.genKeyPair();
var AB = A.getPublic().mul(B.getPrivate())
var BC = B.getPublic().mul(C.getPrivate())
var CA = C.getPublic().mul(A.getPrivate())
var ABC = AB.mul(C.getPrivate())
var BCA = BC.mul(A.getPrivate())
var CAB = CA.mul(B.getPrivate())
console.log(ABC.getX().toString(16))
console.log(BCA.getX().toString(16))
console.log(CAB.getX().toString(16))
*/

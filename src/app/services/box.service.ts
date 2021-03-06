import { Injectable } from "@angular/core";
import { EncryptService } from "./encrypt.service";
import * as bip39 from "bip39";
import { EthereumProtocol } from "airgap-coin-lib";

declare var require: any;

const Box = require("3box");
const Web3 = require("web3");
const Web3HDWalletProvider = require("web3-hdwallet-provider");

interface ExposedPromise<T> {
  promise: Promise<T>;
  resolve: (value?: any | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

function exposedPromise<T>(): ExposedPromise<T> {
  let resolve, reject;

  // tslint:disable-next-line:promise-must-complete
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

@Injectable({
  providedIn: "root"
})
export class BoxService {
  ready: ExposedPromise<void> = exposedPromise<void>();

  box: any;

  constructor(private readonly encryptService: EncryptService) {
    const MNEMONIC =
      "sock gap aspect guilt lab stove business end defense jump giggle dilemma";
    const ADDRESS = "0x7D748F41a1d55DED34cDFF777795867579A77068";
    Box.openBox(
      ADDRESS,
      new Web3HDWalletProvider(
        MNEMONIC,
        new Web3.providers.HttpProvider(
          "https://eth-rpc-proxy.airgap.prod.gke.papers.tech/"
        )
      ),
      {}
    )
      .then(box => {
        this.box = box;
        this.ready.resolve();
        console.log("box ready");
        // console.log('hooray');

        // Box.getThread('you1', 'login', ADDRESS, true).then(thread => {
        //   console.log(thread);
        //   // thread.addMember('0x7D748F41a1d55DED34cDFF777795867579A77068');
        //   // thread.post('app' + Date());
        //   // thread.onUpdate(() => {
        //   //   thread.getPosts().then(console.log);
        //   // });
        // });

        // box.public.set('name', 'Molly the Panda');

        // box.openSpace('you1').then(space => {
        //   console.log(space);
        //   space
        //     .joinThread('login', {
        //       // firstModerator: '0x7D748F41a1d55DED34cDFF777795867579A77068',
        //       firstModerator: '0xb2Fd35b8Ac12799A35780e89a50861D1EcDD290d',
        //       members: true
        //     })
        //     .then(thread => {
        //       thread.post('app' + Date());

        //       console.log('thread', thread);
        //       thread.listMembers().then(console.log);
        //       thread.getPosts().then(res => {
        //         console.log('res', res);
        //       });
        //     });
        // });
      })
      .catch(error => {
        this.ready.reject(error);
      });
  }

  public init() {
    // initialize
  }

  async storePasswords(db: string, mnemonic: string, passwords: any[]) {
    console.log("mnemonic", mnemonic);
    await this.ready.promise;

    const space = await this.box.openSpace("you");
    const address = await this.getAddressFromMnemonic(mnemonic);

    const key = await this.getOrCreateKey(space, db, mnemonic);

    console.log("have key", key);

    const encryptedKey = await this.encryptService.encryptWithMnemonic(
      key,
      mnemonic
    );

    console.log(
      "setting private space",
      `key_${address}_${db}`,
      JSON.stringify(encryptedKey)
    );
    await space.private.set(
      await this.hash(`key_${address}_${db}`),
      JSON.stringify(encryptedKey)
    );
    const encryptedPayload = await this.encryptService.encryptPayload(
      passwords,
      key
    );

    await space.private.set(
      await this.hash(db),
      JSON.stringify(encryptedPayload)
    );
  }

  async readPasswords(db: string, mnemonic: string) {
    await this.ready.promise;

    const space = await this.box.openSpace("you");

    console.log("space", space);
    const key = await this.getOrCreateKey(space, db, mnemonic);

    const passwords = await this.encryptService.decryptPayload(
      JSON.parse(await space.private.get(await this.hash(db))),
      key
    );
    return passwords;
  }

  async getAddressFromMnemonic(mnemonic: string) {
    const seed: string = (bip39 as any).mnemonicToSeedHex(mnemonic);
    const protocol = new EthereumProtocol();

    const pubKey = protocol.getPublicKeyFromHexSecret(
      seed,
      protocol.standardDerivationPath
    );
    return protocol.getAddressFromPublicKey(pubKey);
  }

  async getOrCreateKey(space: any, db: string, mnemonic: string) {
    const address = await this.getAddressFromMnemonic(mnemonic);

    try {
      console.log("checking", `key_${address}_${db}`);
      const remoteEncryptedKey = JSON.parse(
        await space.private.get(await this.hash(`key_${address}_${db}`))
      );

      if (!remoteEncryptedKey) {
        throw new Error("RemoteEncryptionKey is null");
      }

      console.log("remoteEncryptedKey", remoteEncryptedKey);

      return this.encryptService.decryptWithMnemonic(
        remoteEncryptedKey,
        mnemonic
      );
    } catch (error) {
      console.log("No key present, generating new one", error);
      return this.encryptService.generateKey();
    }
  }

  async hash(str: string) {
    return Buffer.from(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str))
    ).toString("hex");
  }
}

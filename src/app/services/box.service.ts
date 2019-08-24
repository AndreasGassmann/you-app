import { Injectable } from '@angular/core';

declare var require: any;

const Box = require('3box');
const Web3 = require('web3');
const Web3HDWalletProvider = require('web3-hdwallet-provider');

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
  providedIn: 'root'
})
export class BoxService {
  ready: ExposedPromise<void> = exposedPromise<void>();

  box: any;

  constructor() {
    const MNEMONIC =
      'sock gap aspect guilt lab stove business end defense jump giggle dilemma';
    const ADDRESS = '0x7D748F41a1d55DED34cDFF777795867579A77068';
    Box.openBox(
      ADDRESS,
      new Web3HDWalletProvider(
        MNEMONIC,
        new Web3.providers.HttpProvider(
          'https://eth-rpc-proxy.airgap.prod.gke.papers.tech/'
        )
      ),
      {}
    )
      .then(box => {
        this.box = box;
        this.ready.resolve();
        console.log('box ready');
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

  async storePasswords(passwords: any[]) {
    const space = await this.box.openSpace('you');
    await space.private.set('passwords', JSON.stringify(passwords));
  }

  async readPasswords() {
    const space = await this.box.openSpace('you');
    const passwords = JSON.parse(await space.private.get('passwords'));
    return passwords;
  }
}

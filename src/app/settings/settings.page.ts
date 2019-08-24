import { Component } from '@angular/core';
import {
  SecureStorage,
  SecureStorageService
} from '../services/secure-storage.service';
import { Platform } from '@ionic/angular';

import * as bip39 from 'bip39';
import { EthereumProtocol } from 'airgap-coin-lib';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class settingsPage {
  mnemonic: string;
  constructor(
    private readonly platform: Platform,
    private readonly secureStorageService: SecureStorageService,
    private readonly pushService: PushService
  ) {
    this.platform.ready().then(() => {
      this.useMnemonic1();
    });
  }

  public useMnemonic1() {
    this.mnemonic =
      'busy tuna bird various jar make must empower morning miracle nose museum';
    this.useMnemonic();
  }

  public useMnemonic2() {
    this.mnemonic =
      'agree choose chaos first ticket cash clog hawk entire brief zone wall';
    this.useMnemonic();
  }

  private async useMnemonic() {
    const seed: string = (bip39 as any).mnemonicToSeedHex(this.mnemonic);
    const protocol = new EthereumProtocol();

    const pubKey = protocol.getPublicKeyFromHexSecret(
      seed,
      protocol.standardDerivationPath
    );
    const address = await protocol.getAddressFromPublicKey(pubKey);
    this.pushService.register(address);

    const secureStorage: SecureStorage = await this.secureStorageService.get(
      'secret',
      false
    );

    return secureStorage.setItem('secret', this.mnemonic);
  }
}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BoxService } from './services/box.service';
import { SecureStorageService } from './services/secure-storage.service';
import { PushService } from './services/push.service';

import * as bip39 from 'bip39';
import { EthereumProtocol } from 'airgap-coin-lib';

declare let SecurityUtils: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private boxService: BoxService,
    private secureStorage: SecureStorageService,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    this.boxService.init();
    if (this.platform.is('cordova')) {
      SecurityUtils.LocalAuthentication.toggleAutomaticAuthentication(false);
    }
    const secureStorage = await this.secureStorage.get('secret', false);
    const secret = await secureStorage.getItem('secret');

    console.log('getSecret', secret);

    if (secret) {
      const seed: string = (bip39 as any).mnemonicToSeedHex(secret);
      const protocol = new EthereumProtocol();

      const pubKey = protocol.getPublicKeyFromHexSecret(
        seed,
        protocol.standardDerivationPath
      );
      const address = await protocol.getAddressFromPublicKey(pubKey);
      this.pushService.register(address);
    }
  }
}

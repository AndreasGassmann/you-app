import { Component } from '@angular/core';
import {
  SecureStorage,
  SecureStorageService
} from '../services/secure-storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class settingsPage {
  mnemonic: string;
  constructor(
    private readonly platform: Platform,
    private readonly secureStorageService: SecureStorageService
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
    const secureStorage: SecureStorage = await this.secureStorageService.get(
      'secret',
      false
    );

    return secureStorage.setItem('secret', this.mnemonic);
  }
}

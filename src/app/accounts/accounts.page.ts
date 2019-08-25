import { Component, OnInit } from "@angular/core";
import { BoxService } from "../services/box.service";
import { IAccount, PasswordService } from "../services/password.service";
import { SecureStorageService } from "../services/secure-storage.service";

@Component({
  selector: "app-accounts",
  templateUrl: "accounts.page.html",
  styleUrls: ["accounts.page.scss"]
})
export class accountsPage implements OnInit {
  accounts: IAccount[] = [];

  constructor(
    private readonly passwordService: PasswordService,
    private readonly boxService: BoxService,
    private readonly secureStorageService: SecureStorageService
  ) {}

  async ngOnInit() {
    console.log("ready");
    this.checkForAccounts(); // TODO: Use observables
    /*
    const secureStorage = await this.secureStorageService.get("secret", false);
    const mnemonic = await secureStorage.getItem("secret");
    await this.boxService.storePasswords("main", mnemonic, [
      {
        id: "1",
        title: "Coinbase",
        icon: "assets/images/coinbase-logo.png",
        username: "satoshi@gmail.com",
        password: "mySecretPassword",
        location: "www.coinbase.com",
        lastUsed: new Date(),
        group: "Crypto",
        tag: ["ETH", "Bitcoin"]
      },
      {
        id: "2",
        title: "Amazon",
        icon: "assets/images/amazon-logo.jpg",
        username: "satoshi@gmail.com",
        password: "mySecretPassword",
        location: "www.amazon.com",
        lastUsed: new Date(),
        group: "Entertainment",
        tag: ["enterntainment"]
      },
      {
        id: "3",
        title: "Netflix",
        icon: "assets/images/netflix-logo.png",
        username: "satoshi@gmail.com",
        password: "mySecretPassword",
        location: "www.netflix.com",
        lastUsed: new Date(),
        group: "Entertainment",
        tag: ["enterntainment"]
      }
    ]);
*/
    // console.log('stored');
  }

  checkForAccounts() {
    if (!this.passwordService.accountList) {
      setInterval(() => {
        this.checkForAccounts();
      }, 100);
    } else {
      this.accounts = this.passwordService.accountList;
    }
  }
}

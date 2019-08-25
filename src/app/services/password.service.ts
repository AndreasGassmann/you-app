import { Injectable } from "@angular/core";
import { BoxService } from "./box.service";
import { SecureStorageService } from "./secure-storage.service";

export interface IAccount {
  id: string;
  title: string;
  icon: string;
  username: string;
  location: string;
  lastUsed: Date;
  group: string;
  tag: string[];
  password?: string;
}

@Injectable({
  providedIn: "root"
})
export class PasswordService {
  accountList: IAccount[] = undefined;

  constructor(
    private readonly boxService: BoxService,
    private readonly secureStorageService: SecureStorageService
  ) {
    window.localStorage.setItem(
      "accounts",
      JSON.stringify([
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
      ])
    );

    const cachedAccountsString = window.localStorage.getItem("accounts");
    if (cachedAccountsString) {
      console.log("READING FROM CACHE");
      const cachedAccounts = JSON.parse(cachedAccountsString);
      this.accountList = cachedAccounts;
    }
    this.boxService.ready.promise.then(async () => {
      const secureStorage = await this.secureStorageService.get(
        "secret",
        false
      );
      const secret = await secureStorage.getItem("secret");

      this.boxService
        .readPasswords("main", secret)
        .then((accounts: IAccount[]) => {
          window.localStorage.setItem("accounts", JSON.stringify(accounts));
          this.accountList = accounts;
        });
    });
  }

  async getPasswordForLocation(location: string): Promise<IAccount> {
    await this.boxService.ready.promise;
    const result = this.accountList.find(
      account => account.location === location
    );

    if (result) {
      return result;
    } else {
      throw new Error("No account found!");
    }
  }

  async getPasswordById(id: string) {
    return this.accountList.find(account => account.id === id);
  }
}

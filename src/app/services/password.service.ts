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
    this.boxService.ready.promise.then(async () => {
      const secureStorage = await this.secureStorageService.get(
        "secret",
        false
      );
      const secret = await secureStorage.getItem("secret");

      this.boxService
        .readPasswords("main", secret)
        .then((accounts: IAccount[]) => {
          this.accountList = accounts;
        });
    });
  }

  async getPasswordForLocation(
    location: string
  ): Promise<{ username: string; password: string }> {
    await this.boxService.ready.promise;
    const result = this.accountList.find(
      account => account.location === location
    );

    if (result) {
      return { username: result.username, password: result.password };
    } else {
      throw new Error("No account found!");
    }
  }
}

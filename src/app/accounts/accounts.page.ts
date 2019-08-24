import { Component, OnInit } from "@angular/core";
import { BoxService } from "../services/box.service";

interface IAccount {
  id: string;
  title: string;
  icon: string;
  username: string;
  location: string;
  lastUsed: Date;
  group: string;
  tag: string[];
}

@Component({
  selector: "app-accounts",
  templateUrl: "accounts.page.html",
  styleUrls: ["accounts.page.scss"]
})
export class accountsPage implements OnInit {
  accounts: IAccount[] = [];

  constructor(private readonly boxService: BoxService) {}

  async ngOnInit() {
    await this.boxService.ready.promise;
    console.log("ready");
    /*
    await this.boxService.storePasswords([
      {
        id: '1',
        title: 'Netflix',
        icon:
          'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
        username: 'myemail@gmail.com',
        location: 'https://netflix.com',
        lastUsed: new Date(),
        group: 'Family',
        tag: ['enterntainment']
      },
      {
        id: '1',
        title: 'Netflix',
        icon:
          'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
        username: 'myemail@gmail.com',
        location: 'https://netflix.com',
        lastUsed: new Date(),
        group: 'Family',
        tag: ['enterntainment']
      },
      {
        id: '1',
        title: 'Netflix',
        icon:
          'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
        username: 'myemail@gmail.com',
        location: 'https://netflix.com',
        lastUsed: new Date(),
        group: 'Family',
        tag: ['enterntainment']
      }
    ]);*/
    console.log("stored");
    this.boxService.readPasswords().then(passwords => {
      this.accounts = passwords;
    });
  }
}

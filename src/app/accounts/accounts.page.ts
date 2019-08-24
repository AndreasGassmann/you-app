import { Component } from '@angular/core';

interface IAccount {
  title: string;
  icon: string;
  username: string;
  location: string;
  lastUsed: Date;
  group: string;
  tag: string[];
}

@Component({
  selector: 'app-accounts',
  templateUrl: 'accounts.page.html',
  styleUrls: ['accounts.page.scss']
})
export class accountsPage {
  accounts: IAccount[] = [
    {
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
      title: 'Netflix',
      icon:
        'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
      username: 'myemail@gmail.com',
      location: 'https://netflix.com',
      lastUsed: new Date(),
      group: 'Family',
      tag: ['enterntainment']
    }
  ];

  constructor() {}
}

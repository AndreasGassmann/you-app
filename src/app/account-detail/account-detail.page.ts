import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss']
})
export class AccountDetailPage implements OnInit {
  uuid: string;
  username: string;
  password: string;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {}

  authorizeLogin() {
    this.apiService.sendLoginResponse(this.uuid, this.username, this.password);
  }
}

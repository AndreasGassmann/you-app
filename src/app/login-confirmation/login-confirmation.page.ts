import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ViewController } from '@ionic/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-confirmation',
  templateUrl: './login-confirmation.page.html',
  styleUrls: ['./login-confirmation.page.scss']
})
export class LoginConfirmationPage implements OnInit {
  uuid: string;
  username: string;
  password: string;

  constructor(
    private readonly apiService: ApiService,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {}

  authorizeLogin() {
    this.apiService.sendLoginResponse(this.uuid, this.username, this.password);
    this.modalController.dismiss();
  }
}

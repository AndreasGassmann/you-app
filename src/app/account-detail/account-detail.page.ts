import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { IAccount, PasswordService } from "../services/password.service";
import { ModalController } from "@ionic/angular";
import { LoginConfirmationPage } from "../login-confirmation/login-confirmation.page";

@Component({
  selector: "app-account-detail",
  templateUrl: "./account-detail.page.html",
  styleUrls: ["./account-detail.page.scss"]
})
export class AccountDetailPage implements OnInit {
  account: IAccount = undefined;
  uuid: string;
  username: string;
  password: string;

  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly passwordService: PasswordService,
    private readonly modalController: ModalController
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get("accountId");
    console.log(id);
    this.passwordService.getPasswordById(id).then(account => {
      this.account = account;
    });
  }

  ngOnInit() {}

  async promptLogin() {
    console.log("triggering modal");
    const modal = await this.modalController.create({
      component: LoginConfirmationPage,
      componentProps: {
        account: this.account,
        uuid: this.uuid,
        username: this.account.username,
        password: this.account.password
      }
    });

    modal.present().catch(error => console.error("Modal in push", error));
  }
}

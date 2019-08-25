import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { IAccount, PasswordService } from "../services/password.service";

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
    private readonly passwordService: PasswordService
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get("accountId");
    console.log(id);
    this.passwordService.getPasswordById(id).then(account => {
      this.account = account;
    });
  }

  ngOnInit() {}

  authorizeLogin() {
    this.apiService.sendLoginResponse(this.uuid, this.username, this.password);
  }
}

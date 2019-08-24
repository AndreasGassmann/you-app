import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { clientsPage } from "./clients.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild([{ path: "", component: clientsPage }])
  ],
  declarations: [clientsPage]
})
export class clientsPageModule {}

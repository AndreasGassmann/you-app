import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "accounts",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../accounts/accounts.module").then(
                m => m.accountsPageModule
              )
          }
        ]
      },
      {
        path: "clients",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../clients/clients.module").then(m => m.clientsPageModule)
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../settings/settings.module").then(
                m => m.settingsPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/accounts",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/accounts",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SiteLayoutComponent} from "./components/site-layout/site-layout.component";
import {FragmentsComponent} from "./components/fragments/fragments.component";
import {LayoutsComponent} from "./components/layouts/layouts.component";
import {TailorPagesComponent} from "./components/tailor-pages/tailor-pages.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
// import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent}
    // {path: 'register', component: RegisterPageComponent}
  ]
  },
  {path: '', redirectTo: "/fragments", pathMatch: "full"},
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'fragments', component: FragmentsComponent},
      {path: 'layouts', component: LayoutsComponent},
      {path: 'pages', component: TailorPagesComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

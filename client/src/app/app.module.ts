import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {SiteLayoutComponent} from './components/site-layout/site-layout.component';
import {FragmentsDialogComponent} from "./components/layouts/fragments-dialog/fragments-dialog.component";
import {SearchBoxModule} from "./shared/components/search-box/search-box.module";
import {ArrayFilterPipe} from "./shared/pipes/array-filter.pipe";
import {TokenInterceptor} from "./services/auth/token.interceptor";
import {LoginPageComponent} from "./components/login-page/login-page.component";
// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatCheckboxModule} from '@angular/material'
import {MatExpansionModule} from '@angular/material/expansion';
import {FragmentsComponent} from './components/fragments/fragments.component';
import {LayoutsComponent} from './components/layouts/layouts.component';
// import {TailorPagesComponent} from './components/tailor-pages/tailor-pages.component';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    LoginPageComponent,
    AppComponent,
    SiteLayoutComponent,
    FragmentsComponent,
    LayoutsComponent,
    // TailorPagesComponent,
    FragmentsDialogComponent,
// pipes
    ArrayFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SearchBoxModule,
    // material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule, MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatChipsModule
  ],
  entryComponents: [FragmentsDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

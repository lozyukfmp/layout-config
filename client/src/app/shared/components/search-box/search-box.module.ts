import {NgModule} from "@angular/core";
import {SearchBoxComponent} from "./search-box.component";
import {MatFormFieldModule, MatIconModule, MatInputModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [
    SearchBoxComponent
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class SearchBoxModule {
}

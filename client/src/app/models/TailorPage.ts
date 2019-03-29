import {Layout} from "./Layout";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class TailorPage {
  _id?: string;
  requestUrls: string[];
  layout: Layout;

  constructor() {
    this.requestUrls = [];
    this.layout = new Layout();
  }
}

export class TailorPageViewModel extends TailorPage {
  formControl: FormControl;
  filteredLayouts: Observable<Layout[]>;
}

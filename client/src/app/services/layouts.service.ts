import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from "./dataBase.service";
import {Layout} from "../models/Layout";
import {PortalService} from "./portal.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LayoutsService extends DataBaseService<Layout> {

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/layout`);
  }


  public fetch(): Observable<Layout[]> {
    const options = {
      params: {
        portalName: this.portalService.getCurrentValue()
      }
    };
    return super.fetch(options);
  }

  public create(body: any): Observable<Layout> {
    body.portalName = this.portalService.getCurrentValue();
    return super.create(body);
  }
}

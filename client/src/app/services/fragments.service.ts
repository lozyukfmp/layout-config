import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Fragment} from "../models/Fragment";
import {environment} from "../../environments/environment";
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from "./dataBase.service";
import {Observable} from "rxjs";
import {PortalService} from "./portal.service";

@Injectable({
  providedIn: 'root'
})
export class FragmentsService extends DataBaseService<Fragment>{

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/fragment`);
  }


  public fetch(): Observable<Fragment[]> {
    const options = {
      params: {
        portalName: this.portalService.getCurrentValue()
      }
    };
    return super.fetch(options);
  }


  public create(body: any): Observable<Fragment> {
    body.portalName = this.portalService.getCurrentValue();
    return super.create(body);
  }
}

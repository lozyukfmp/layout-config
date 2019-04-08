import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from "./dataBase.service";
import {PortalService} from "./portal.service";
import {Observable} from "rxjs";
import {Page} from "../models/Page";


@Injectable({
  providedIn: 'root'
})
export class PagesService extends DataBaseService<Page> {

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private portalService: PortalService) {
    super(http, snackBar, `${environment.baseApiUrl}/page`);
  }


  public fetch(): Observable<Page[]> {
    const options = {
      params: {
        portalName: this.portalService.getCurrentValue()
      }
    };
    return super.fetch(options);
  }

  public create(body: any): Observable<Page> {
    body.portalName = this.portalService.getCurrentValue();
    return super.create(body);
  }
}

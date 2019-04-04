import {DataBaseService} from "../dataBase.service";
import {Injectable} from "@angular/core";
import {Page} from "../../models/Page";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PageTreeRestService extends DataBaseService<Page>{

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/pages`);
  }

}

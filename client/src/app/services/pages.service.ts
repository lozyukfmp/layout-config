import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TailorPage} from "../models/TailorPage";
import {environment} from "../../environments/environment";
import {DataBaseService} from "./dataBase.service";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class PagesService extends DataBaseService<TailorPage> {

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/page`);
  }
}

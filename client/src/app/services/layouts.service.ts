import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from "./dataBase.service";
import {Layout} from "../models/Layout";


@Injectable({
  providedIn: 'root'
})
export class LayoutsService extends DataBaseService<Layout> {

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/layout`);
  }
}

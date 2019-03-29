import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Fragment} from "../models/Fragment";
import {environment} from "../../environments/environment";
import {MatSnackBar} from '@angular/material';
import {DataBaseService} from "./dataBase.service";

@Injectable({
  providedIn: 'root'
})
export class FragmentsService extends DataBaseService<Fragment>{

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/fragment`);
  }
}

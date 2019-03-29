import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Preferences} from "../models/Preferences";
import {environment} from "../../environments/environment";
import {DataBaseService} from "./dataBase.service";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends DataBaseService<Preferences> {

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/preferences`);
  }
}

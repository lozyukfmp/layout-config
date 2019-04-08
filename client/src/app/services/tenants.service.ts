import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DataBaseService} from './dataBase.service';
import {MatSnackBar} from '@angular/material';
import {Tenant} from '../models/Tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends DataBaseService<Tenant> {

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/tenant`);
  }
}

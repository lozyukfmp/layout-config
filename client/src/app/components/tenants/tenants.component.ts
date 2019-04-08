import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TenantService} from '../../services/tenants.service';
import {MatSnackBar} from '@angular/material';
import {Tenant} from '../../models/Tenant';

@Component({
  selector: 'tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.less']
})
export class TenantsComponent implements OnInit {

  public _expandedNewForm = false;
  public _crudLoading = false;
  public _tenants: Observable<Tenant[]>;
  public _newTenantForm: Tenant = new Tenant();

  _filterValue: string;

  ngOnInit() {
    this.updateTenants();
  }

  constructor(private tenantService: TenantService,
              public snackBar: MatSnackBar) {
  }

  updateTenants() {
    this._expandedNewForm = false;
    this._tenants = this.tenantService.fetch();
  }

  _revertData() {
    this.updateTenants();
  }

  public _createTenant() {
    this.tenantService.create(this._newTenantForm).subscribe(_ => {
      this.snackBar.open('Tenant has been created', '', {duration: 2000, panelClass: '_success'});
      this._rollBackNewFrom();
      this.updateTenants();
    });
  }

  _deleteTenant(tenant: Tenant) {
    this.tenantService.delete(tenant._id).subscribe(_ => {
      this.snackBar.open('Tenant has been deleted', '', {duration: 2000, panelClass: '_success'});
      this._rollBackNewFrom();
      this.updateTenants();
    });
  }

  _editTenant(tenant: Tenant) {
    this.tenantService.update(tenant).subscribe(_ => {
      this.snackBar.open('Tenant has been updated', '', {duration: 2000, panelClass: '_success'});
      this._rollBackNewFrom();
      this.updateTenants();
    });
  }

  public _rollBackNewFrom() {
    this._newTenantForm = new Tenant();
  }
}

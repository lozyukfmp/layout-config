import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {PortalService} from '../../services/portal.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  public _links = [
    {url: '/fragments', name: 'Fragments'},
    {url: '/tenants', name: 'Tenants'},
    {url: '/layouts', name: 'Layouts'}
  ];

  public activePortal: Observable<string>;
  public portals$: Observable<string[]>;

  constructor(private auth: AuthService,
              private router: Router,
              private portalService: PortalService) { }

  ngOnInit() {
    this.portals$ = this.portalService.getPortals();
    this.activePortal = this.portalService.currentPortal;
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  changePortal(portalName: string) {
    this.portalService.changePortal(portalName);
  }
}

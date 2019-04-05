import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

const portals: string[] = ['b2b-eCare', 'b2b-eCommerce', 'b2c-eCare', 'b2c-eCommerce', 'b2c-pos', 'b2b-pos'];

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private portalSource = new BehaviorSubject<string>(portals[0]);
  public currentPortal: Observable<string> = this.portalSource.asObservable();

  public getCurrentValue(): string {
    return this.portalSource.getValue();
  }

  public changePortal(portal: string) {
    this.portalSource.next(portal);
  }

  public getPortals(): Observable<string[]> {
    return of(portals);
  }
}

import {Injectable} from '@angular/core';
import {DataBaseService} from "./dataBase.service";

const portals: string[] = ['b2b-eCare', 'b2b-eCommerce', 'b2c-eCare', 'b2c-eCommerce', 'b2c-pos', 'b2b-pos'];

@Injectable({
  providedIn: 'root'
})
export class PortalService extends DataBaseService<string> {

  constructor() {
    super(null, null, null);
    this.entity.next(portals[0]);
    this.entities.next(portals);
  }

  public changePortal(portal: string) {
    this.entity.next(portal);
  }

}

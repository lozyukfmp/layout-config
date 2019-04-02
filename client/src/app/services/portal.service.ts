import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PortalService {

  public getPortals(): Observable<string[]> {
    return of(['b2b-eCare', 'b2b-eCommerce', 'b2c-eCare', 'b2c-eCommerce', 'b2c-pos', 'b2b-pos']);
  }
}

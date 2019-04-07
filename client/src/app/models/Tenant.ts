import {BaseEntity} from "./BaseEntity";

export class Tenant extends BaseEntity {
  instance: string;
  name: string;
}

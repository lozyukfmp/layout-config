export class Fragment {
  _id?: string;
  name: string;
  description?: string;
  url: string;
  renderTag: string;
  isCustom: boolean;
  customContent: string;
  attribute: string;

  constructor() {
    this.isCustom = false;
    this.name = "";
    this.description = "";
    this.url = "";
    this.renderTag = "";
    this.customContent = "";
    this.attribute = "";
  }
}

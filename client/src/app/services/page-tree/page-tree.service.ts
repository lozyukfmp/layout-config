import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Page} from "../../models/Page";


export class TodoItemFlatNode {
  url: string;
  level: number;
  expandable: boolean = true;
}

const TREE_DATA = {
  Groceries: {
    AlmondMealflour: {
      Apple: {}
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class PageTreeService {
  dataChange = new BehaviorSubject<Page[]>([]);
  activePage = new BehaviorSubject<Page>(null);

  get data(): Page[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  buildFileTree(obj: { [key: string]: any }, level: number): Page[] {
    return Object.keys(obj).reduce<Page[]>((accumulator, key) => {
      const value = obj[key];
      const node = new Page();
      node.url = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.url = value;
        }
      }
      if (level === 0) {
        this.changePage(node);
      }
      return accumulator.concat(node);
    }, []);
  }

  insertItem(parent: Page, name: string, level: number) {
    if (parent.children) {
      parent.children.push({url: name, children: [], level: level} as Page);
      this.dataChange.next(this.data);
    }
  }

  deleteItem(itemNode: Page) {
    const parentNode: Page = this.getParentItemNode(itemNode, this.data);
    parentNode.children = parentNode.children.filter(childNode => childNode.url !== itemNode.url);
    this.dataChange.next(this.data);
  }

  updateItem(node: Page, name: string, level: number) {
    node.url = name;
    node.level = level;
    this.dataChange.next(this.data);
  }

  getParentItemNode(node: Page, parentNodes?: Page[]): Page {
    if (parentNodes === null) {
      return null;
    }
    if (parentNodes === undefined) {
      parentNodes = this.data;
    }
    for (const parentNode of parentNodes) {
      if (parentNode.children.includes(node)) {
        return parentNode;
      }
      return this.getParentItemNode(node, parentNode.children);
    }
    return null;
  }

  changePage(page: Page) {
    this.activePage.next(page);
  }
}

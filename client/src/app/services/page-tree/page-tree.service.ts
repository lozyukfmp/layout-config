import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Page} from "../../models/Page";


export class TodoItemFlatNode {
  name: string;
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
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.name = value;
        }
      }
      if (level === 0) {
        this.changePage(node);
      }
      return accumulator.concat(node);
    }, []);
  }

  insertItem(parent: Page, name: string, level: number): Page {
    let currentData: Page[] = this.data;
    const newPage = Object.assign(new Page(), {url: name, children: [], level: level});
    if (parent) {
      parent.children.push(newPage);
    } else {
      currentData.push(newPage);
    }
    this.dataChange.next(currentData);
    return newPage;
  }

  deleteItem(itemNode: Page) {
    let currentData: Page[] = this.data;
    const parentNode: Page = this.getParentItemNode(itemNode, currentData);
    if (parentNode != null) {
      parentNode.children = parentNode.children.filter(childNode => childNode.name !== itemNode.name);
    } else {
      currentData = currentData.filter(node => node.name !== itemNode.name);
    }
    this.dataChange.next(currentData);
  }

  updateItem(node: Page, name: string, level: number) {
    node.name = name;
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

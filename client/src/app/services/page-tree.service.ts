import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {DataBaseService} from "./dataBase.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {environment} from "../../environments/environment";

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
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
export class PageTreeService extends DataBaseService<any> {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
    super(http, snackBar, `${environment.baseApiUrl}/layout`);
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name, children: []} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  deleteItem(itemNode: TodoItemNode) {
    const parentNode: TodoItemNode = this.getParentItemNode(this.data, itemNode);
    parentNode.children = parentNode.children.filter(childNode => childNode.item !== itemNode.item);
    this.dataChange.next(this.data);
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  private getParentItemNode(parentNodes: TodoItemNode[], node: TodoItemNode): TodoItemNode {
    if (!parentNodes) {
      return undefined;
    }
    for (const parentNode of parentNodes) {
      if (parentNode.children.includes(node)) {
        return parentNode;
      }
      return this.getParentItemNode(parentNode.children, node);
    }
    return undefined;
  }
}

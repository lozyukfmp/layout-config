import {Component} from "@angular/core";
import {PageTreeService, TodoItemFlatNode} from "../../services/page-tree/page-tree.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";
import {Page} from "../../models/Page";

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.less']
})
export class PageTreeComponent {

  flatNodeMap = new Map<TodoItemFlatNode, Page>();

  nestedNodeMap = new Map<Page, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<Page, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<Page, TodoItemFlatNode>;

  constructor(private pageTreeService: PageTreeService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    pageTreeService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: Page): Page[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.url === '';

  transformer = (node: Page, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.url === node.url
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.url = node.url;
    flatNode.level = level;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.pageTreeService.insertItem(parentNode!, '', node.level);
    this.treeControl.expand(node);
  }

  removeItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.pageTreeService.deleteItem(parentNode);
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.pageTreeService.updateItem(nestedNode!, itemValue, node.level);
  }

  selectPage(node: TodoItemFlatNode) {
    const nestedNode = this.flatNodeMap.get(node);
    this.pageTreeService.changePage(nestedNode);
  }
}

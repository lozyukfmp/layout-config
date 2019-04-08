import {Component, OnDestroy, ViewEncapsulation} from "@angular/core";
import {PageTreeService, TodoItemFlatNode} from "../../services/page-tree/page-tree.service";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";
import {Page} from "../../models/Page";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PageTreeComponent implements OnDestroy {

  flatNodeMap = new Map<TodoItemFlatNode, Page>();

  nestedNodeMap = new Map<Page, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<Page, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<Page, TodoItemFlatNode>;

  private activePage: Page;
  private unsub$: Subject<void> = new Subject();

  constructor(private pageTreeService: PageTreeService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    pageTreeService.dataChange
      .pipe(
        takeUntil(this.unsub$)
      )
      .subscribe(data => this.dataSource.data = data);

    this.pageTreeService.activePage
      .pipe(
        takeUntil(this.unsub$)
      )
      .subscribe(page => this.activePage = page);
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: Page): Page[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name === '';

  transformer = (node: Page, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = this.getChildren(node).length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  addNewItem(node?: TodoItemFlatNode) {
    const parentNode: Page = this.flatNodeMap.get(node);
    this.pageTreeService.insertItem(parentNode!, '', node ? node.level : 0);
    this.toggle(node);
  }

  removeItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.pageTreeService.deleteItem(parentNode);
    this.toggle(node);
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.pageTreeService.updateItem(nestedNode!, itemValue, node.level);
  }

  selectPage(node: TodoItemFlatNode) {
    const nestedNode = this.flatNodeMap.get(node);
    this.pageTreeService.changePage(nestedNode);
  }

  toggle(node: TodoItemFlatNode) {
    const parentItemNode = this.pageTreeService.getParentItemNode(this.flatNodeMap.get(node));
    this.treeControl.expand(node);
    if (parentItemNode) {
      const parentItemFlatNode = this.nestedNodeMap.get(parentItemNode);
      this.treeControl.toggle(parentItemFlatNode);
      this.treeControl.toggle(parentItemFlatNode);
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}

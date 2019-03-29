import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {fromEvent, Subscription} from "rxjs";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("searchField", {read: ElementRef}) searchField: ElementRef;

  @Output() searchValueChanged = new EventEmitter<string>();
  @Input() placeholder: string;

  private filterSubscription: Subscription;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.filterSubscription = fromEvent(this.searchField.nativeElement, "input")
      .pipe(pluck("target", "value"))
      .subscribe((searchValue: string) => this.searchValueChanged.emit(searchValue));
  }

  ngOnDestroy() {
    this.filterSubscription && this.filterSubscription.unsubscribe();
  }
}

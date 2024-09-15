import {Component, EventEmitter, Input, input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() placeholder: string = '';
  @Output() onEnterEmitter: EventEmitter<string> = new EventEmitter();
  @Input() inputInitialValue: string = '';

  sendValue( value: string ): void {
    this.onEnterEmitter.emit(value);
  }

  onKeyPress( searchTerm: string ): void {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(1000))
      .subscribe( value => {
      console.log('Debouncer: ', value);
      this.sendValue(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

}

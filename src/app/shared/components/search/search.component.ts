import {Component, EventEmitter, Input, input, Output} from '@angular/core';

@Component({
  selector: 'shared-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Input() placeholder: string = '';

  @Output() onEnterEmitter: EventEmitter<string> = new EventEmitter();

  sendValue( value: string ): void {
    this.onEnterEmitter.emit(value);
  }

}

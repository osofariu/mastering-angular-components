import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mac-checkbox',
  templateUrl: './checkbox.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @Input() inLabel: string;
  @Input() inIsChecked: boolean;
  @Output() outChecked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  check(checkedValue: boolean) {
    this.outChecked.emit(checkedValue);
  }
}

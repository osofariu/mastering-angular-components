import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mac-toggle',
  templateUrl: './toggle.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ToggleComponent implements OnInit {

  @Input() buttonList: string[];
  @Input() activeButton: string;
  @Output() outActivate = new EventEmitter<string>();

  constructor() { }

  activate(button: string) {
    this.outActivate.emit(button);
  }

  ngOnInit() {
    if (!this.activeButton) {
      this.activeButton = this.buttonList[0];
    }
  }
}

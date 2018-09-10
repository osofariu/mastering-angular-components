import { Component, ViewEncapsulation, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent  {
  @Input() inTask: any;

  @HostBinding('class.done')
  get done() {
    return this.inTask && this.inTask.done;
  }

  constructor() {
  }
}

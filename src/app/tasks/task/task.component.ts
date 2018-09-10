import { Component, ViewEncapsulation, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model';
import { TaskService } from '../task.service';

@Component({
  selector: 'mac-task',
  templateUrl: './task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent  {
  @Input() inTask: any;
  @Output() outTaskChange = new EventEmitter<Task>();

  private taskService: TaskService;

  @HostBinding('class.done')
  get done() {
    return this.inTask && this.inTask.done;
  }

  constructor(aTaskService: TaskService) {
    this.taskService = aTaskService;
  }

  updateTask(done: boolean) {
    this.outTaskChange.emit({...this.inTask, done});
  }
}

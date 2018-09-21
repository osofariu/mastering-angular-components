import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskListFilterType } from '../../model';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent {

  @Input() filteredTasks: Task[];
  @Input() taskListFilterTypes: TaskListFilterType[];
  @Input() activeTaskFilterType: TaskListFilterType;
  @Output() outNewTaskTitle = new EventEmitter<string>();
  @Output() outModifiedTask = new EventEmitter<Task>();
  @Output() outActiveTaskFilterType = new EventEmitter<string>();
  constructor() {  }

  addTask(title: string) {
    this.outNewTaskTitle.emit(title);
  }

  updateTask(task: Task) {
    this.outModifiedTask.emit(task);
  }

  activateFilterType(taskFilterType: TaskListFilterType) {
    this.outActiveTaskFilterType.emit(taskFilterType);
  }
}

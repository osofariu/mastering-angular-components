import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Task } from '../../model';
import { TaskService } from '../task.service';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  private taskService: TaskService;

  constructor(private taskServiceArg: TaskService) {
    this.taskService = taskServiceArg;
  }

  addTask(title: string) {
    const task: Task = { title: title, done: false};
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getTasks();
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }
}

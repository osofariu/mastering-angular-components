import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { Task, TaskListFilterType } from '../../model';
import { TaskService } from '../task.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent {
  tasks: Task[];
  filteredTasks: Task[];
  taskListFilterTypes: TaskListFilterType[] = ['all', 'open', 'done'];
  activeTaskFilterType: TaskListFilterType = 'all';

  private taskService: TaskService;

  constructor(private aTaskService: TaskService) {
    this.taskService = aTaskService;
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  addTask(title: string) {
    const task: Task = { title: title, done: false};
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  activateFilterType(taskFilterType: TaskListFilterType) {
    this.activeTaskFilterType = taskFilterType;
    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks
      .filter((task: Task) => {
        if (this.activeTaskFilterType === 'all') {
          return true;
        } else if (this.activeTaskFilterType === 'open') {
          return !task.done;
        } else {
          return task.done;
        }
      });
  }
}

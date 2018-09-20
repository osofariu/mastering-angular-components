import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task, TaskListFilterType } from '../../model';
import { TaskService } from '../task.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent {
  private tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  taskListFilterTypes: TaskListFilterType[] = ['all', 'open', 'done'];
  activeTaskFilterType = new  BehaviorSubject<TaskListFilterType>('all');

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = combineLatest(this.tasks, this.activeTaskFilterType)
    .pipe(
      map(([task, activeTaskFilterType]) => {
        return task.filter((task: Task) => {
          if (activeTaskFilterType === 'all') {
            return true;
          } else if (activeTaskFilterType === 'open') {
            return !task.done;
          } else {
            return task.done;
          }
        });
      })
    )
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

  activateFilterType(taskFilterType: TaskListFilterType) {
    this.activeTaskFilterType.next(taskFilterType);
  }
}

import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task, TaskListFilterType } from '../../model';
import { TaskService } from '../../tasks/task.service';

@Component({
  selector: 'mac-task-list-container',
  templateUrl: './task-list-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListContainerComponent implements OnInit {

  private tasks: Observable<Task[]>;
  filteredTasks: Observable<Task[]>;
  activeTaskFilterType = new  BehaviorSubject<TaskListFilterType>('all');
  taskListFilterTypes: TaskListFilterType[] = ['all', 'open', 'done'];

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = combineLatest(this.tasks, this.activeTaskFilterType)
    .pipe(
      map(([task, activeTaskFilterType]) => {
        return task.filter((aTask: Task) => {
          if (activeTaskFilterType === 'all') {
            return true;
          } else if (activeTaskFilterType === 'open') {
            return !aTask.done;
          } else {
            return aTask.done;
          }
        });
      })
    );
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
  ngOnInit() {
  }

}

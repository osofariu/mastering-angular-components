import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

import { Task } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = new BehaviorSubject<Task[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadTasks();
   }

   loadTasks() {
    this.httpClient.get<Task[]>('/api/tasks/')
      .subscribe((tasks) => this.tasks.next(tasks));
   }

  getTasks() {
    return this.tasks.asObservable();
  }

  addTask(task: Task) {
    this.httpClient.post<Task>('/api/tasks', task)
      .subscribe(() => this.loadTasks());
  }

  updateTask(task: Task) {
    this.httpClient.post<Task>(`/api/tasks/${task.id}`, task)
      .subscribe(() => this.loadTasks());
  }
}

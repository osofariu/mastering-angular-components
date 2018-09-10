import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mac-task-list',
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks = [
    {id: 1, title: 'Task 1', done: false},
    {id: 2, title: 'Task 2', done: true}
  ];
  id = this.tasks.length + 1;

  constructor() { }

  addTask(title: string) {
    this.tasks.push({ title, done: false, id: this.id } );
    this.id += 1;
  }
  ngOnInit() {
  }
}

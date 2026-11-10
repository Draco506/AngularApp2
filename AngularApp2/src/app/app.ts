
import { Component } from '@angular/core';

import { TaskListComponent } from './task-list/task-list';
import { TaskFormComponent } from './taskform/taskform';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent],
  template: `
    <main class="main-layout">
      <h1>Daily Task Tracker</h1>
      <app-task-form></app-task-form>
      <hr />
      <app-task-list></app-task-list>
    </main>
  `,
  styles: [`
    .main-layout { max-width: 600px; margin: 20px auto; font-family: sans-serif; padding: 20px; }
    hr { margin: 30px 0; border: 0; border-top: 1px solid #ddd; }
  `]
})
export class AppComponent {}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskService } from '../services/tasks.services';
import { TaskTruncatePipe } from '../pipes/tasks.truncate.pipe';
import { TaskHighlightDirective } from '../directives/task-highlight.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskTruncatePipe, TaskHighlightDirective],
  template: `
    <div class="task-container">
      <h2>My Daily Tasks</h2>
      
      <!-- Option A: Using Async Pipe (Recommended RxJS subscription pattern) -->
      <div *ngIf="tasks$ | async as tasks; else loading">
        <div class="task-card" *ngFor="let task of tasks" 
             appTaskHighlight [priority]="task.priority" [completed]="task.completed">
          <div class="task-info">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description | taskTruncate:40 }}</p>
            <small>Due: {{ task.dueDate | date:'mediumDate' }} | Priority: {{ task.priority }}</small>
          </div>
          <button (click)="toggleTask(task.id)">
            {{ task.completed ? 'Mark Incomplete' : 'Complete' }}
          </button>
        </div>
        
        <p *ngIf="tasks.length === 0" class="no-tasks">No tasks available. Add one below!</p>
      </div>

      <ng-template #loading>
        <p>Loading tasks...</p>
      </ng-template>
    </div>
  `,
  
})
export class TaskListComponent {
  // Exposing the observable directly to be consumed by the async pipe
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  toggleTask(id: number): void {
    this.taskService.toggleTaskCompletion(id);
  }
}
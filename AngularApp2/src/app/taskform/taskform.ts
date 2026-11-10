import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/tasks.services';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h3>Add New Task</h3>
      <form (submit)="onSubmit()">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" [(ngModel)]="title" name="title" required />
        </div>
        
        <div class="form-group">
          <label>Description:</label>
          <textarea [(ngModel)]="description" name="description"></textarea>
        </div>

        <div class="form-group">
          <label>Due Date:</label>
          <input type="date" [(ngModel)]="dueDate" name="dueDate" required />
        </div>

        <div class="form-group">
          <label>Priority:</label>
          <select [(ngModel)]="priority" name="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  `,
  styleUrls: ['./taskform.css']
})
export class TaskFormComponent {
  title = '';
  description = '';
  dueDate: Date = new Date();
  priority: 'Low' | 'Medium' | 'High' = 'Medium';

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (!this.title.trim()) return;
    
    this.taskService.addTask(
      this.title, 
      this.description, 
      new Date(this.dueDate), 
      this.priority
    );

    // Reset form fields
    this.title = '';
    this.description = '';
    this.dueDate = new Date();
    this.priority = 'Medium';
  }
}
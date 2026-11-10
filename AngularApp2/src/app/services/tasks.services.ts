import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root' // Proper use of Dependency Injection
})
export class TaskService {
  // Initial in-memory array of tasks
  private initialTasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assignment',
      description: 'Finish building the task tracker app with pipes, directives, and services.',
      dueDate: new Date('2026-11-15'),
      completed: false,
      priority: 'High'
    },
    {
      id: 2,
      title: 'Review RxJS Observables',
      description: 'Go over chapters 4-6 of Learning Angular text.',
      dueDate: new Date('2026-11-10'),
      completed: true,
      priority: 'Medium'
    }
  ];

  // BehaviorSubject to hold and broadcast the current state
  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  
  // Public Observable stream for components to subscribe to
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor() {}

  // Add a new task to the array and update observers
  addTask(title: string, description: string, dueDate: Date, priority: 'Low' | 'Medium' | 'High'): void {
    const currentTasks = this.tasksSubject.getValue();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
      priority
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  // Toggle task completion status
  toggleTaskCompletion(id: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }
}
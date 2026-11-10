import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTruncate',
  standalone: true
})
export class TaskTruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
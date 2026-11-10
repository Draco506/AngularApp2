import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTaskHighlight]',
  standalone: true
})
export class TaskHighlightDirective implements OnInit {
  @Input() priority: 'Low' | 'Medium' | 'High' = 'Low';
  @Input() completed: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyStyles();
  }

  // Updates styles when bound properties change
  ngOnChanges(): void {
    this.applyStyles();
  }

  private applyStyles(): void {
    // Apply strike-through if completed
    if (this.completed) {
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #6c757d');
      return;
    }

    // Otherwise, highlight based on priority
    this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
    this.renderer.removeStyle(this.el.nativeElement, 'opacity');

    switch (this.priority) {
      case 'High':
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #dc3545'); // Red
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff5f5');
        break;
      case 'Medium':
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #ffc107'); // Yellow
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fffdf0');
        break;
      case 'Low':
      default:
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #28a745'); // Green
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f4fff4');
        break;
    }
  }
}
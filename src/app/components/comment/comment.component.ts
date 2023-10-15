import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  isExpanded = false;
  isReplying = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  toggleReplying() {
    this.isReplying = !this.isReplying;
    if (this.isReplying) {
      this.isExpanded = true;
    }
  }
}

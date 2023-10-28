import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { CommentComponent } from '../components/comment/comment.component';
import { Comment } from '../interfaces/comment.interface';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  userService = inject(UserService);

  comments = signal<Comment[]>([]);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.userValue;

    if (!user) {
      return;
    }

    this.commentService
      .createComment({
        text,
        userId: user.user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  // only update the DOM elements associated with the items affected by the change
  commentTrackBy(index: number, comment: Comment) {
    return comment._id;
  }
}

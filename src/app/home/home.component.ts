import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
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
  comments = signal<Comment[]>([]);

  userService = inject(UserService);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      console.log(comments);
      this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    // const user = this.userService.getUserFromStorage();
    const user = this.userService.userValue;

    console.log('user', user)

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

  // createComment(formValues: { text: string }) {
  //   const { text } = formValues;
  //   // const user = this.userService.getUserFromStorage();
  //   const user = this.userService.userValue;
  //   if (!user) {
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${user.token}`,
  //   });

  //   console.log('creating comment', user);

  //   this.commentService
  //     .createComment(
  //       {
  //         text,
  //         userId: user._id,
  //       },
  //       { headers }
  //     )
  //     .subscribe((createdComment) => {
  //       this.comments.set([createdComment, ...this.comments()]);
  //     });
  // }


}

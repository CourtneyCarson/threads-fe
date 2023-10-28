import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviornment } from '../enviornment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  // get all comments
  getComments(parentId: string = '') {
    let url = `${enviornment.apiBaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url); //returns observable of type comment
  }

  // create comment
  createComment(params: CreateCommentDto) {
    return this.http.post<Comment>(
      `${enviornment.apiBaseUrl}/comments`,
      params
    );
  }
}

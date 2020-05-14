import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentNewComponent } from './pages/comment-new/comment-new.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentComponent } from './pages/comment/comment.component';
import { CommentService } from './shared/services/comment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CommentNewComponent,
    CommentsComponent,
    CommentComponent,
  ],
  providers:[
    CommentService
  ],
  entryComponents:[CommentNewComponent]
})
export class CommentsModule { }

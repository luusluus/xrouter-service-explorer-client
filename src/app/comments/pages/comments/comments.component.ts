import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../shared/models/comment.model';
import { CommentService } from '../../shared/services/comment.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  
  comments:Comment[];
  @Input('nodePubKey') nodePubKey:string;
  @Input('serviceName') serviceName:string;

  loading:boolean;

  constructor(private commentService: CommentService){}

  ngOnInit() {
    this.populateComments();
  }

  private populateComments(){
    this.loading = true;
    this.commentService.getServiceComments(this.serviceName, this.nodePubKey).subscribe(comments => {
      this.comments = comments;      
      this.loading = false;
    });
  }

  onNewComment(c:Comment){
    this.comments.push(c);
    this.populateComments();
  }

  onDeletedComment(commentId:number){
    const index = this.comments.findIndex(c => c.id == commentId);
    this.comments.splice(index, 1);
  }
}

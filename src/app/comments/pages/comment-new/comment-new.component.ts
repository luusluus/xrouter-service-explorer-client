import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NewComment } from '../../shared/models/newComment.model';
import { Comment } from '../../shared/models/comment.model';
import { NgForm } from '@angular/forms';
import { User } from '../../../core/authentication/shared/models/user.model';
import { Subscription, forkJoin } from 'rxjs';
import { AccountService } from '../../../core/authentication/shared/services/account.service';
import { CommentService } from '../../shared/services/comment.service';
@Component({
  selector: 'comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit, OnDestroy {
  commentBody:string;
  @Output('newComment') newComment = new EventEmitter<Comment>();

  @Input('nodePubKey') nodePubKey:string;
  @Input('serviceName') serviceName:string;
  @Input('commentId') commentId:string;
  
  @ViewChild('commentForm') serviceForm: NgForm;
  
  user:User;
  subscription: Subscription;
  isUserAuthenticated: boolean;
  constructor(
    private commentService: CommentService,
    private accountService: AccountService,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    ) { 
      this.user = new User();

      this.subscription = this.accountService.isUserAuthenticated.subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
        if(isAuthenticated) {
          var sources = [
              this.accountService.name(),
              this.accountService.avatarUrl(),
              this.accountService.id(),
          ];

          forkJoin(sources).subscribe(data =>{
              this.user.userName = data[0];
              this.user.avatarUrl = data[1];
              this.user.userId = data[2];
          }, err => {
              if(err.status == 404){
              }
              
          });
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onCommentSubmit(){
    let newComment = new NewComment();
    newComment.commentBody = this.commentBody;
    newComment.nodePubKey = this.nodePubKey;
    newComment.serviceId = this.serviceName;
    if(this.commentId){
      newComment.parentCommentId = this.commentId;
    }
    this.commentService.newComment(newComment).subscribe(newComment =>{
      this.newComment.emit(newComment);
      this.serviceForm.reset();
    });
  }

  login(){
    this.accountService.login(this.document.location.hash.substr(1));
  }
}

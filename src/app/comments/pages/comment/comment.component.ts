import { OnInit, OnDestroy, Component, ViewChildren, QueryList, ViewContainerRef, ElementRef, Input, ComponentFactoryResolver, Renderer2, ViewChild, Output, EventEmitter } from "@angular/core";
import { AccountService } from "../../../core/authentication/shared/services/account.service";
import { ViewportScroller } from "@angular/common";
import { User } from '../../../core/authentication/shared/models/user.model';
import { Subscription, forkJoin } from "rxjs";
import { Comment } from '../../shared/models/comment.model';
import { SaveComment } from "../../shared/models/saveComment.model";
import { CommentNewComponent } from "../comment-new/comment-new.component";
import { CommentService } from "../../shared/services/comment.service";

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css'],
  })
  export class CommentComponent implements OnInit, OnDestroy {
    @Input('comment') comment:Comment;
    @Input('nodePubKey') nodePubKey:string;
    @Input('serviceName') serviceName:string;
    @Output('newComment') newComment = new EventEmitter<Comment>();
    @Output('deletedComment') deletedComment = new EventEmitter<string>();
    
    user:User;
    subscription: Subscription;

    commentBody:string;
    isUserAuthenticated = false;
    @ViewChild('reply', { read: ViewContainerRef }) container: ViewContainerRef;
    @ViewChild('replyButton') replyButtonRef: ElementRef;
    componentRef:any;

    constructor(private resolver: ComponentFactoryResolver, 
            private accountService: AccountService,
            private commentService: CommentService,
            private viewportScroller: ViewportScroller,
            private renderer: Renderer2) 
    {
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
                    if(err.status == 404) {

                    }
                    
                });
            }
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

        
    onJump(elementId:string){
        this.viewportScroller.scrollToAnchor("cmt-" + elementId);
    }

    toggleEditComment(){
        this.comment.editMode = true;
    }
    
    editComment(){
        let editedComment = new SaveComment();
        editedComment.body = this.comment.body;
        editedComment.id = this.comment.id;
        this.commentService.editComment(editedComment).subscribe(editedComment => {
            this.comment = editedComment;
        });
    }
    
    cancelEditComment(){
        this.comment.editMode = false;
    }

    deleteComment(){
        if(confirm("Are you sure?")){ 
            this.commentService.deleteComment(this.comment.id).subscribe(res =>{
                this.deletedComment.emit(res);
            });
        }
    }

    createCommentReplyComponent() {
        let el = this.replyButtonRef.nativeElement;
        let commentBox = this.container;
        let componentRef = this.componentRef;

        if(el.textContent === "Cancel"){ 
            this.renderer.setProperty(el, "textContent", "Reply");
            componentRef.instance.newComment.unsubscribe();      
            componentRef.destroy();
        } else{   
            commentBox.clear();
            const factory = this.resolver.resolveComponentFactory(CommentNewComponent);
            
            this.componentRef = commentBox.createComponent(factory);
            componentRef = this.componentRef;
            componentRef.instance.nodePubKey = this.nodePubKey;
            componentRef.instance.serviceName = this.serviceName;
            componentRef.instance.user = this.user;
            componentRef.instance.commentId = this.comment.id;  
            componentRef.instance.newComment.subscribe(c => {
                this.newComment.emit(c);
                this.renderer.setProperty(el, "textContent", "Reply");
                componentRef.destroy();
            });
    
            this.renderer.setProperty(el, "textContent", "Cancel");
        }   
    }
  }
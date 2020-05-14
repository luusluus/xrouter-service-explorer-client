import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { BaseService } from '../../../shared/services/base.service';
import { NewComment } from '../models/newComment.model';
import { SaveComment } from '../models/saveComment.model';
import { Comment } from '../models/comment.model';



@Injectable()
export class CommentService extends BaseService{
  private readonly apiEndpoint = 'Comment';
  private baseEndpoint = '/api/';

  constructor(private http:HttpClient) {
    super();
   }

  newComment(comment:NewComment){
    return this.http.post<Comment>(this.baseEndpoint + this.apiEndpoint + '/NewComment/', comment);
  }

  editComment(comment:SaveComment){
    return this.http.put<Comment>(this.baseEndpoint + this.apiEndpoint + '/' + comment.id, comment);
  }

  deleteComment(id:number){
    return this.http.delete<string>(this.baseEndpoint + this.apiEndpoint + '/' + id);
  }

  getServiceComments(serviceId:string, nodePubKey:string){
    return this.http.get<Comment[]>(this.baseEndpoint + this.apiEndpoint + '/GetServiceComments?' + "&serviceId=" + serviceId + "&nodePubKey=" + nodePubKey);
  }
}

export class Comment {
    public id:number;
    public body:string;
    public userName:string;
    public avatarUrl:string;
    public dateCreatedIndication:string;
    public dateModifiedIndication:string;
    public dateCreated:Date;
    public dateModified:Date;
    public replies: Comment[];
    public editMode:boolean = false;
    public verified:boolean;
    public parentComment:boolean;
}

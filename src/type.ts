export interface Usertype{
    id:number;
    username:String;
    email:String;
    password:String;
    Post:Posttype[];
    profile:Profile;
}

export interface Posttype {
    id:number;
    content :string;
    createdAt:string;
    authorId:number;
    author:Usertype;
}

export interface Profile{
    id:number;
    bio:String;
    profileImageUrl:String;
    userId:number;
    user:Usertype;
}
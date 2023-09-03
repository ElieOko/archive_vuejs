interface IApi{
    method:string
    urlParems:string
    endPoint:string
}
export interface IDirectory{
DirectoryId:number
DirectoryName:string
available:boolean
created_at?:string
parentId?:number
updated_at?:string
}
export const url ="http://127.0.0.1:8000/api"

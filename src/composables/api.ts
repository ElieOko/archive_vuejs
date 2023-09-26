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
export const url ="https://archive.archi-tech.site/api"

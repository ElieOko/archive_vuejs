

export interface Invoice{
    InvoiceId?:number
    InvoiceCode:string
    InvoiceDesc:string
    InvoiceBarCode:string
    DirectoryFId:number
    subFolder:number
    InvoicekeyFId:number
    dataCreated:string
    ClientPhone:string
    ExpiredDate:string
    ClientName:string 
    InvoiceUniqueId:string
    AndroidVersion:string
    UserFId:number
    InvoiceDate:string
    InvoicePath:string
    BranchFId:number
    user?:IUser
    directory?:IDirectory
    invoicekey?:InvoiceKey

}

export interface InvoiceKey{
    DirectoryFId:number ,
    Invoicekey:string ,
    InvoicekeyId:number,
    created_at?: string,
    updated_at?:string
}

export interface IFile{
    name:string
    path:string
}
export interface IUserApp{
    user:IUser
    token:string
}
export interface IUser{
    UserId:number | any
    username:string
    mail:string
    BranchFId:number | any
    created_at:string
    email_verified_at?:string
    phone?:string
    serialNumber?:string
    smstoken?:string
    updated_at?:string
    branch?:IBranch
}
export interface IBranch{
    id:number
    BranchName:string
}
export interface IUserAuth{
    username:string
    password:string
}

export interface IDirectory{
    DirectoryId: number, 
    DirectoryName: string, 
    parentId?: number , 
    available: boolean, 
    created_at?: string, 
    updated_at?: string
}

export interface IMultiple{
    InvoiceFId:number
    PictureId:number
    PictureName?:string
    PictureOriginalName:string
    PicturePath:string
    PublicUrl:string
    created_at?:string
    updated_at?:string
    invoice:Invoice
    isActive:boolean
}
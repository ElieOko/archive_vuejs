export interface Invoice{
    InvoiceId?:number
    InvoiceCode:string
    InvoiceDesc:string
    InvoiceBarCode:string
    DirectoryFId:number
    subFolder:number
    InvoiceKeyFId:number
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
    pictures:Array<IPicture>
    directory?:IDirectory
    invoicekey?:InvoiceKey
    dateFrom?:string,
    dateTo?:string,
    isActive:boolean,
    isSelected?:boolean
}
export interface Invoice2{
    InvoiceId?:number
    InvoiceCode:string
    InvoiceDesc:string
    InvoiceBarCode:string
    DirectoryFId:number
    subFolder:number
    InvoiceKeyFId:number
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
    pictures:Array<IPrevPicture>
    directory?:IDirectory
    invoicekey?:InvoiceKey
    dateFrom?:string,
    dateTo?:string,
    isActive:boolean,
    isSelected?:boolean
}
export interface InvoiceKey{
    DirectoryFId:number ,
    Invoicekey:string ,
    InvoicekeyId:number,
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
    UserName:string
    BranchFId:number | any
    Phone?:string
    Admin:number
    SerialNumber?:string
    smstoken?:string
    branch?:IBranch
}
export interface IBranch{
    id:number
    BranchName:string
}
export interface IUserAuth{
    UserName:string
    UserPass:string
}

export interface IDirectory{
    DirectoryId: number, 
    DirectoryName: string, 
    ParentFId?: number , 
    Available: boolean, 
    ForClient: boolean
}

export interface IMultiple{
    InvoiceFId:number
    PictureId:number
    PictureName?:string
    PictureOriginalName:string
    PicturePath:string
    PublicUrl:string
    invoice:Invoice
    isActive:boolean
}
export interface IPrevPicture{
    PublicUrl:string
}
export interface IPicture{
    InvoiceFId:number
    PictureId:number
    PictureName?:string
    PictureOriginalName:string
    PicturePath:string
    PublicUrl:string
    isActive:boolean
}
export interface IAllInvoicePicture{
    invoice:Invoice
    isActive:boolean
}




export interface IAllData{
  current_page      :            number,
  data              :            Array<Invoice>,
  first_page_url    :            String,
  from              :            number,
  last_page         :            number,
  last_page_url     :            String,
  links             :            Array<ILink>,
  next_page_ur      :            String,
  path              :            String,
  per_page          :            number,
  prev_page_url?    :            string,
  to                :            number,
  total             :            number
}
interface ILink{
    url?: String,
    label: String,
    active: Boolean,
}

export interface IMedia{
    thumb: string,
    src: string,
    caption: string
}
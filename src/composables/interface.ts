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
    isActive:boolean
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
export interface IPicture{
    InvoiceFId:number
    PictureId:number
    PictureName?:string
    PictureOriginalName:string
    PicturePath:string
    PublicUrl:string
    created_at?:string
    updated_at?:string
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
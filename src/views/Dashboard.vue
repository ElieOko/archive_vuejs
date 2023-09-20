<script  lang="ts">
import { url } from '@/composables/api';
import type { IAllData, IAllInvoicePicture, IMedia, IMultiple, IPicture, Invoice } from '@/composables/interface';
import { getUser } from '@/composables/userService';
import axios from 'axios';
import { ref } from 'vue';
// @ts-ignore
import { TailwindPagination } from 'laravel-vue-pagination';
// @ts-ignore
import FsLightbox from "fslightbox-vue/v3"
import { useRouter } from 'vue-router';

const router = useRouter()
const visibleRef = ref<Boolean>(false)
const indexRef = ref<number>(0)
const user =  getUser()
const open = ref(false)
const imgsRef = ref<Array<String>>()
const lightbox = ref()
const selectFilter =["All","Key","Code","Description","Barcode","Username","DirectoryName","BranchName","Date"]
const choixFilter = ref("All")
const dropdownOpen = ref(false)
const invoices = ref<Invoice>({
      ClientPhone:'',
      InvoiceCode:'',
      InvoiceDesc:'',
      InvoiceBarCode:'',
      DirectoryFId:0,
      subFolder:0,
      InvoiceKeyFId:0,
      dataCreated:'',
      ClientName:'',
      ExpiredDate:'',
      InvoiceUniqueId:'',
      AndroidVersion:'',
      UserFId:user?.user.UserId,
      InvoiceDate:'',
      InvoicePath:'',
      BranchFId:user?.user.BranchFId,
      dateFrom:'',
      dateTo:'',
      pictures:[],
      isActive:false
})

const invoicesReq = ref<Invoice>({
      ClientPhone:'',
      InvoiceCode:'',
      InvoiceDesc:'',
      InvoiceBarCode:'',
      DirectoryFId:0,
      subFolder:0,
      InvoiceKeyFId:0,
      dataCreated:'',
      ClientName:'',
      ExpiredDate:'',
      InvoiceUniqueId:'',
      AndroidVersion:'',
      UserFId:0,
      InvoiceDate:'',
      InvoicePath:'',
      BranchFId:0,
      dateFrom:'',
      dateTo:'',
      pictures:[],
      isActive:false
})

function showData(id:number){
  router.push(`/invoice?id=${id}`)
}
export default {
  components: {
    TailwindPagination,
    FsLightbox
  },
  
  data() {
    return {
      router,
      slide: 1,
      toggler: false,
      index: null as any,
      visibleRef,
      indexRef,
      imgsRef,
      media:[] as any,
      invoices,
      invoicesReq,
      choixFilter,
      selectFilter,
      dataInvoice:{} as IAllData,
      stock:[{}] as Array<Array<IMultiple>>,
      allData:[{}] as Array<Array<IMultiple>>,
      q:'',
      isEnabled:true,
      isActive: false,
      setVisible:false,
      msg:'',
      open:false,
      launch:false,
      isVisibility:false,
      launchSearchAdv:false,
      filter:false,
      isFound:true,
      dropdownOpen,
      subDiretory:[{id:0,name:''}],
          diretory:[{
            DirectoryId: 0, 
            DirectoryName: '', 
            parentId: null, 
            available: '', 
            created_at: null, 
            updated_at: null
          }],
          keyInvoice:[{
            DirectoryFId:0 ,
            Invoicekey:'' ,
            InvoicekeyId:0,
            created_at: '',
            updated_at:''
          }],
          listKeys:[{id:0,name:''}],
          lightbox
    };
  },
  methods:{
      showData(value:number){
        this.$router.push({
          path:"/invoice",
          query:{
              value
          }
        })
      },
     showImg (index:number)  {
            indexRef.value = index
            visibleRef.value = true
          },
           onHide() {
            visibleRef.value = false;
           },
    startSearch(){
      this.launchSearchAdv = !this.launchSearchAdv
      this.filter = false
    },
    async  deleteInvoice(id:number){
        try {
          this.$data.open = true
          this.$data.msg = "Chargement encours"
          const response = await axios.delete(`${url}/invoice/${id}`);
          this.getAllInvoice()
          this.$data.msg = "Success" 
        } catch (error) {
        }
  },
  async startFilter(){
    if(this.q != "" && choixFilter.value != "All"){
      this.open = true
      switch (choixFilter.value ) {
      case "All":
          const dataInvoice = JSON.parse(JSON.stringify(invoicesReq.value))
          const response = await axios.post(`${url}/filter/invoice`,dataInvoice)
          this.dataInvoice = response.data
          this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
          }
          else{
            this.open = false
            this.isFound = false
          }
        break;
      case "Key":
      
        const dataInvoice2 = JSON.parse(JSON.stringify(invoicesReq.value))
        const response2 = await axios.post(`${url}/filter/invoice`,dataInvoice2)
        this.dataInvoice = response2.data
        this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
          }
          else{
            this.open = false
            this.isFound = false
          }
         break;  
      case "Code":
        invoicesReq.value.InvoiceCode = this.q
        const dataInvoice3 = JSON.parse(JSON.stringify(invoicesReq.value))
        const response3 = await axios.post(`${url}/filter/invoice`,dataInvoice3)
        this.dataInvoice = response3.data
        console.log("code find ->",this.dataInvoice);
        
        this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
            invoicesReq.value.InvoiceCode = ""
          }
          else{
            this.open = false
            this.isFound = false
            invoicesReq.value.InvoiceCode = ""
          }
         break;
      case "Description":
        invoicesReq.value.InvoiceDesc = this.q
        const dataInvoice4 = JSON.parse(JSON.stringify(invoicesReq.value))
        const response4 = await axios.post(`${url}/filter/invoice`,dataInvoice4)
        this.dataInvoice = response4.data
        this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
            invoicesReq.value.InvoiceDesc = ""
          }
          else{
            this.open = false
            this.isFound = false
            invoicesReq.value.InvoiceDesc = ""
          }
         break;
      case "Barcode":
        invoicesReq.value.InvoiceBarCode = this.q
        const dataInvoice5 = JSON.parse(JSON.stringify(invoicesReq.value))
        const response5 = await axios.post(`${url}/filter/invoice`,dataInvoice5)
        this.dataInvoice = response5.data
        this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
            invoicesReq.value.InvoiceBarCode = ""
          }
          else{
            invoicesReq.value.InvoiceBarCode = ""
            this.open = false
            this.isFound = false
          }
         break;
      case "Username":
         break;
      case "DirectoryName":
         break;
      case "BranchName":
         break;
      case "Date":
        invoicesReq.value.InvoiceDate = this.q
        const dataInvoice6 = JSON.parse(JSON.stringify(invoicesReq.value))
        const response6 = await axios.post(`${url}/filter/invoice`,dataInvoice6)
        this.dataInvoice = response6.data
        this.$data.setVisible = true
          if(this.dataInvoice.data.length>0){
            this.isFound = true
            this.open = false
          }
          else{
            this.open = false
            this.isFound = false
          }
         break;
      default:
        this.open = false
        break;
    }
    }
    else{
      this.open = true
        axios.get(`${url}/allinvoice`).then((response)=>{    
        this.dataInvoice = response.data
        this.open = false
      });
    }
  },
    async update(data:any){
  try{
    const id =data.InvoiceId
    this.$data.open = true
    this.$data.msg = "Chargement encours"
    if(invoices.value.InvoiceDesc != "" && invoices.value.InvoiceBarCode != "" ){
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       console.log("Versus -> ",response)
       this.$data.msg = "Success"
       this.$data.open = false
    }
    else if(invoices.value.InvoiceDesc == "" && invoices.value.InvoiceBarCode != ""){
      invoices.value.InvoiceDesc = data.invoice.InvoiceDesc;
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       console.log("Versus -> ",response)
       this.$data.msg = "Success"
       this.$data.open = false
    }
    else{
       invoices.value.InvoiceBarCode = data.InvoiceBarCode;
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       console.log("est-<",dataInvoice)
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       console.log("Versus -> ",response)
       this.$data.msg = "Success"
       this.$data.open = false
    }
    invoices.value.InvoiceBarCode =''
    invoices.value.InvoiceDesc =''
  }
  catch (error){
    console.error(error)
  }
},
    editActivate(value:any){
  this.dataInvoice.data.map((v:Invoice,k:number)=>{
    if(v?.InvoiceId == value.InvoiceId ){
      if(v.isActive){
              v.isActive = false
            }
            else{
              v.isActive = true
            }
    }
  })

    },
    async getAllInvoice(pages:number= 1) {
        this.open = true
        axios.get(`${url}/allinvoice?page=${pages}`).then((response)=>{    
        this.dataInvoice = response.data
        console.log("global ->",this.dataInvoice);
        this.open = false
      });
    },
    funActivy(){
      if(this.q == ""){
        this.$data.setVisible = true
        //this.getAllInvoice()
      }
      else{
        this.$data.setVisible = false
      }
    },
    onBack(){
      this.open = false
    },
    changeSelectFilter(value:string){
      choixFilter.value = value
      dropdownOpen.value = false
    },
    changeSelect(){
      if(invoices.value.DirectoryFId){
        let i = 0;
        let check = 0;
        console.log("oui");
        this.diretory.map((v,k)=>{
          console.log("no");
          check++
          if(v.parentId != null){
            if(v.parentId == invoices.value.DirectoryFId){
              console.log("biso");
              check--
              if(i == 0){
                this.subDiretory =[]
              }
              i++
            console.log("parendId =>",v.parentId)
            this.subDiretory.push({id:v.DirectoryId,name:v.DirectoryName})
          }
          }
          else{
            if(this.subDiretory.length ==check  ){
              this.subDiretory =[]
              this.isEnabled = false
            }
          }
        })
        if(this.subDiretory.length > 0){
          this.isEnabled = true
        }
        let tour = 0
        this.listKeys = []
        this.keyInvoice.map((v,k)=>{
           if(v.DirectoryFId == invoices.value.DirectoryFId){
              if(tour != 0){
                this.listKeys = []
              }
              tour++
              this.listKeys.push({id:v.InvoicekeyId,name:v.Invoicekey})
           }
        })
      }
    },
    galleryShow(indexClick:number,picture:Array<IPicture>){
      this.index = indexClick
     //this.lightbox.showImage(index)
    },
    async getPicture(id:number,value:number){
      axios
          .get(`${url}/picturebyinvoice/${id}`)
          .then((response)=>{    
            // = response.data
             this.media = []
            response.data.map((v:IPicture)=>{
              this.media.push(v.PublicUrl)
            })
				      this.slide = value + 1
				      this.toggler = !this.toggler;
            console.log("dataPicture =>",response.data)
          });
    }
  },
  computed:{
    
  //     if(this.setVisible && this.q == ""){
  //       return this.dataInvoice.filter(value=>{
  //       return value.invoice.InvoiceCode.toLowerCase().includes(this.q.toLowerCase()) 
  //     })
  //   }
  //   else{
  //     if(this.q  != ""){
  //       return this.dataInvoice.filter(value=>{
  //       return value.invoice.InvoiceCode.toLowerCase().includes(this.q.toLowerCase()) 
  //     })
  //     }
  //     else{
  //       return []
  //     }
  //   }
  // }
  },
  mounted(){
    axios
  .get(`${url}/alldirectory`)
  .then((response)=>{
    this.$data.diretory = response.data
    console.log("data",this.diretory)
  });
  axios
  .get(`${url}/allinvoicekey`)
  .then((response)=>{
    this.$data.keyInvoice = response.data
    console.log("data ->",this.keyInvoice)
  });
    //this.getAllInvoice()
    this.setVisible
    this.isVisibility
    this.launchSearchAdv
    this.filter
    this.dataInvoice
    this.startFilter()
    this.isFound
    this.media
  }
};
</script>

<template>
      <div  class="flex items-center mb-4 " role="alert">
        <div @click="dropdownOpen = !dropdownOpen" class="inline-flex items-center  bg-gray-500 text-white px-5 py-2  hover:bg-gray-700 cursor-pointer" >
            <span>{{ choixFilter}}</span>
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M12 16L6 10L18 10L12 16Z" fill="currentColor" />
            </svg>  
      </div>
        <input v-model="q" class="w-full  text-blue-600 border-gray-200  focus:border-blue-400 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" type="text" placeholder="What are you looking for">    
          <button @click="startFilter()" class="inline-flex items-center  bg-[#1b1717] text-white px-5 py-2  hover:bg-gray-700 cursor-pointer" >
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span> Search</span>
          </button>
    </div>
    <div class=" z-50">
      <div
          v-show="dropdownOpen"
          class=" inset-0 z-10 w-full h-full "
          @click="dropdownOpen = false"
        />
        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0">
          <div
            v-show="dropdownOpen"
            class="absolute left-20 z-20 w-48 py-2 mt-0 bg-white rounded-md shadow-xl">
          <span v-for ="choise in selectFilter" @click="changeSelectFilter(choise)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7188b3] cursor-pointer hover:text-white">
            {{choise}}
          </span>
          </div>
        </transition>
    </div>

      <div class="flex justify-between">
        <label for="toggle" class="flex items-center cursor-pointer mr-16">
    <div class="relative">
      <input
        type="checkbox"
        id="toggle"
        class="sr-only"
        v-model="isActive"
      >
      <div class="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
      <div
        class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
        :class="{ 'translate-x-6': isActive }"
      ></div>
    </div>
    <div class="ml-3 text-gray-700">{{ isActive ?"Images":"Show Images" }}</div>
</label>
  
<span class="inline-flex items-center">
  <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <span @click="startSearch" class="ml-1 text-[#255287] font-bold cursor-pointer">Advanced Search</span>
</span>
    
</div>

    <div v-if="dataInvoice.data?.length > 0" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
      <p>{{dataInvoice.data.length }} Invoices to find.</p>
    </div>
    <div v-else class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
      <p>Nothing Invoices to find.</p>
    </div>
    <div v-if="launchSearchAdv" class="w-full bg-[#343A40] rounded overflow-hidden shadow-lg mb-4">
      <div class="px-6 py-4">
        <div class="w-full ">
      <div class="grid grid-cols-3 -mx-3 mb-4 ">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Code
          </label>
          <input v-model ="invoices.InvoiceCode" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Code">
        </div>
        <div class="w-full  px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Description
          </label>
          <input v-model.lazy ="invoices.InvoiceDesc" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Description">
        </div>
        <div class="w-full  px-3 mb-6 md:mb-0 ">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Barcode
          </label>
          <input v-model.lazy="invoices.InvoiceBarCode" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Barcode">
        </div>
      </div>
      <div class="grid grid-cols-3 -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            From
          </label>
            <input v-model.lazy="invoices.dateFrom" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            To
          </label>
            <input v-model.lazy="invoices.dateTo"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="date">
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Users
          </label>
          <select  v-model.lazy="invoices.UserFId"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" >
            <option></option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-3  -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Directories
          </label>
          <select @change="changeSelect"  v-model.lazy="invoices.DirectoryFId"   class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" >
            <option  v-for="item in diretory" :key="item.DirectoryId" :value="item.DirectoryId" >  {{ item.DirectoryName }}</option>
          </select>
        </div>
            <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Keys
          </label>
          <select v-model.lazy="invoices.InvoiceKeyFId"   class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" >
            <option v-for="item in listKeys" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
        <div class="w-full  px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Branches
          </label>
          <select v-model.lazy="invoices.BranchFId"   class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" >
            <option  v-for="item in subDiretory" :key="item.id" :value="item.id"> {{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="flex gap-4">
          <button @click="startFilter()" class="shadow bg-green-500 inline-flex items-center hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            <svg class="w-6 h-6 text-[#fff]" viewBox="0 0 24 24" fill="none">
              <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            Search
          </button>
          <button class="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-[#000] font-bold py-2 px-4 rounded" type="button">
            Clear
          </button>
          <button class="shadow bg-blue-600  inline-flex items-center hover:bg-blue-400 focus:shadow-outline focus:outline-none text-[#000] font-bold py-2 px-4 rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"  >
      <path d="M18 6L6 18M6 6l12 12"     stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
    </svg> Close
          </button>
      </div>
    </div>
      </div>
    </div>
    <div>
      <TailwindPagination
        :data="dataInvoice"
        class="mb-4 "
        @pagination-change-page="getAllInvoice"
    />
    <div  class="grid grid-cols-2 gap-0 border-1 border-gray-400  mb-4 bg-[#fff]"  v-for="u in dataInvoice.data " v-bind:key="u?.InvoiceId">
      <table class="table-auto border-2 border-gray-200 ">
      <tbody class="border-2 border-gray-400">
        <tr class="border-2 border-gray-400 h-10">
          <td class="border-2 border-gray-400 w-1/4  font-semibold">Code</td>
          <td class="border-2 border-gray-400 text-right">{{ u?.InvoiceCode }}</td>
        </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Description</td>
      <td class="border-2 border-gray-400 text-right">
        <sapn class="text-sm leading-5 text-gray-900" v-if="!u.isActive">
            {{ u?.InvoiceDesc }}
          </sapn>
          <div class="relative mb-0" v-else>
              <input v-model="u.InvoiceDesc" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Description"> 
          </div>
      </td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Barcode</td>
      <td class="border-2 border-gray-400 text-right">
        <sapn class="text-sm leading-5 text-gray-900" v-if="!u.isActive">
          {{ u?.InvoiceBarCode }}
        </sapn>
          <div class="relative mb-0" v-else>
              <input v-model="u.InvoiceBarCode"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Barcode">
          </div>
      </td>
    </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Directory</td>
      <td class="border-2 border-gray-400 text-right">{{ u?.directory?.DirectoryName }}</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Key</td>
      <td class="border-2 border-gray-400 text-right">{{u?.invoicekey?.Invoicekey }}</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Branch</td>
      <td class="border-2 border-gray-400 text-right">{{ u?.user?.branch?.BranchName }}</td>
    </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 w-[30px] font-semibold">Client name</td>
      <td class="border-2 border-gray-400 text-right">{{}}</td>
    </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Phone name</td>
      <td class="border-2 border-gray-400 text-right">{{ u?.user?.phone }}</td> 
    </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">User</td>
      <td class="border-2 border-gray-400 text-right">{{ u?.user?.username   }}</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">Date</td>
      <td class="border-2 border-gray-400 text-right">{{ u?.InvoiceDate   }}</td>
    </tr>
    <tr class="border-2 border-gray-400 h-10">
      <td class="border-2 border-gray-400 font-semibold w-[30px]">Images</td>
      <td class="border-2 border-gray-400 text-right"> <a href="#" class="text-cyan-400">{{u?.pictures?.length  }}files</a></td>
    </tr>
  </tbody>
  </table>
  <div class="container border-2 relative border-gray-400 bottom-0">
    <div class="grid grid-cols-6 mb-24" >
      <img v-if="isActive" v-for="(item,index) in u.pictures"
       :key="item.PictureId" alt="soficom" 
       class="w-[100px] h-[150px] mr-3 "
        :src="item.PublicUrl"
        @click="getPicture(u?.InvoiceId as number,index)">
      <span v-else class="w-[100px] h-[150px] mr-3 "></span>
    </div>
    <div class="group-button absolute  right-1 flex justify-end  left-0 bottom-0 ">
    <button class="bg-gray-400 hover:bg-gray-700  text-white font-bold w-[65px] h-8 rounded  mr-2"  data-te-ripple-init
        data-te-ripple-color="light"
        @click="editActivate(u)">
        {{u.isActive?"Cancel":"Edit"}}
    </button>
    <button
        type="button"
        class="bg-red-400 hover:bg-red-700  text-white w-[65px] h-8 rounded  mr-2"
        data-te-ripple-init
        data-te-ripple-color="light" @click="deleteInvoice(u.InvoiceId as number)">
        Delete
      </button>
    <button 
        type="button"
        @click="update(u)"
        class="bg-green-300 hover:bg-green-700  text-white  w-[65px] h-8  rounded  mr-2"
        data-te-ripple-init
        data-te-ripple-color="light">
            Save
      </button>
      <!-- <button 
        type="button"
        @click="update(u)"
        class="bg-blue-300 hover:bg-blue-400 text-white  w-[65px] h-8  rounded  mr-2"
        data-te-ripple-init
        data-te-ripple-color="light">
            Select
      </button> -->
      <button
        type="button"
        class="bg-[#1b1717] hover:bg-[#151414]  text-white  w-[65px] h-8  rounded  mr-2"
        data-te-ripple-init
        data-te-ripple-color="light" @click="showData(u?.InvoiceId as number)">
        View
      </button>
      <FsLightbox
       initialAnimation="example-initial-animation"
      :loadOnlyCurrentSource="true"
      :toggler="toggler"
			:slide="slide"
			:sources="media"
      type="image"
		 />
  </div>
  </div>
     </div>
    </div>
  <div v-if="!isFound" role="alert">
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    No found
  </div>
  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>No Invoices matching your request..</p>
  </div>
</div>
 <div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"  @click.self="onBack"
      />
      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
             Loading
            </p>
          </div>
              {{ msg }}
              <div class="loader"></div>  
        </div>
      </div>
</div>
</template>

<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
</style>

<script lang="ts">
import { url } from '@/composables/api';
import axios from 'axios';
import apiClient from '@/composables/http-common';
import type { Invoice, IPicture } from '@/composables/interface';
import { getUser } from '@/composables/userService';
import AxiosFormData from 'axios-form-data';
import { computed, onMounted, onServerPrefetch, onUpdated, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
const user =  getUser()


function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
const invoice = ref<Invoice>({
      ClientPhone:'',
      InvoiceCode:'',
      InvoiceDesc:'',
      InvoiceBarCode:'',
      DirectoryFId:0,
      subFolder:0,
      InvoiceKeyFId:0,
      dataCreated:'',
      ClientName:'',
      ExpiredDate:getCurrentDate(),
      InvoiceUniqueId:'',
      AndroidVersion:'',
      UserFId:user?.user.UserId,
      InvoiceDate:getCurrentDate(),
      InvoicePath:'',
      BranchFId:user?.user.BranchFId,
      dateFrom:'',
      dateTo:'',
      pictures:[],
      isActive:false
})

interface IDataFile{
      file?:any 
      name?:string,
      content?:any
}
const fileInput = ref();
const file = ref();
const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

let isDragging = false;
const open = ref(false)
const msg = ref('')

const tabPicture = ref<any>()
const previewUrl = ref<Array<IDataFile>>([]);
const images = ref<Array<IDataFile>>([]);
async function createInvoice(){
  let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const date = new Date();
    const formData = new FormData();
    const milliseconds = date.getSeconds() * 1000;
    invoice.value.InvoiceUniqueId = `${milliseconds}`
    console.log("Voir plus grand ->",images.value[0])
    invoice.value.AndroidVersion = navigator.userAgent
    invoice.value.InvoicePath = "test"
    const data = JSON.parse(JSON.stringify(invoice.value))
    // const dataImage = JSON.parse(JSON.stringify())
    // formData.append('image',images.value[0].name as string);
    formData.append('image[]',images.value[0].content);
    console.log('createInvoice: ', data)
    const axiosInstance = axios.create();
    axiosInstance.defaults.transformRequest = AxiosFormData;

    try {        
        msg.value = "Traitement encours"
        open.value = true
      const response = await  axios.post(`${url}/invoice`,data)
      console.log("Reponse elobi -> ",response)
      if(response.status == 201){
        try {
        images.value.map(async (v,k)=>{
         formData.append('image',v.content);
         formData.append('uniqueId',`${milliseconds}`)
         const rep= await apiClient.post(`${url}/picture`,formData)
         
        //  invoice.value.ClientName =""
        //  invoice.value.ClientPhone =""
        //  invoice.value.InvoiceBarCode = ""
        //  invoice.value.InvoiceDate = getCurrentDate()
        //  invoice.value.InvoiceCode = ""
        //  invoice.value.InvoiceDesc = ""
        //  invoice.value.InvoiceUniqueId = ""
        //  invoice.value.ExpiredDate = getCurrentDate()
         if(images.value.length - 1 == k){
          msg.value = "To store"
          const data :any= rep.data.picture
            open.value = false
           tabPicture.value = data
         }
        })
       
      } catch (error) {
        console.error(error)
      }
      }
    } catch (error) {
      console.log('Erreur')
    }
}

const uploadFile = (event:any) => {
  const files = event.target.files
  console.log("image ",files)
  
  console.log("Test ",files.length)
  for(let i = 0; i < files.length;i++){
    let fileSrc = URL.createObjectURL(files[i])
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      const data = {
        name: files[i].name,
        content: files[i],
        file:event.target.files[i]
      }
      previewUrl.value.push({file:fileSrc,content:files[i]})
      images.value.push(data)
  }
  // files?.map((file:any,i:number)=>{
   
  // })
  //images.value.push({name:files.name,file:files,content:files})
 
  // if (files) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const d = reader.result as string
  //         const encodedFile = d.split(",")[1];
  //           previewUrl.value.push({file:reader.result as string,content:encodedFile})
  //       }  
  //       reader.readAsDataURL(files);
  //     }
};
function removeImageList(indice:number){
  previewUrl.value.splice(indice,1)
  images.value.slice(indice,1)
}


const submitFile = async () => {
  const reader = new FileReader();
  reader.readAsDataURL(fileInput.value);
  reader.onload = async () => {
    const d = reader.result as String
    const encodedFile = d.split(",")[1];
    const data = {
      file: encodedFile,
      fileName: fileName.value,
      fileExtension: fileExtension.value,
      fileMimeType: fileMimeType.value,
    };
    try {
      // const endpoint = "https://example.com/upload";
      // const response = await axios.post(endpoint, data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};
function onBack(){
  open.value = true
}

export default {
  data() {
      return {
        dataUpdate:[{}] as Array<Invoice>,
        queryT:0 as any,
        files: [],
        fileInput,
        isDragging:false,
        open,
        msg,
        previewUrl,
        invoice,
        tabPicture,
        isEnabled:true,
          res: '',
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
      };
  },
  name: "App",
  methods: {

    onChange() {
      //this.files = [...this.file.files];
    },
    dragover(e:any) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },

    drop(e:any) {
      e.preventDefault();
      //this.uploadFile(e.dataTransfer.files)
      console.log("prevent ->",e.dataTransfer.files)
      const files = e.dataTransfer.files
      
      for(let i = 0; i < e.dataTransfer.files.length;i++){
    //const reader = new FileReader()
    let fileSrc = URL.createObjectURL(files[i])
   // reader.readAsDataURL(files[i])
    // reader.onload = () => {
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      const data = {
        name: files[i].name,
        content: files[i],
        file:files[i]
      }
      // const d = reader.result as string
       //const encodedFile = d.split(",")[1]
      previewUrl.value.push({file:fileSrc as string,content:files[i]})
      images.value.push(data)
    //}
    //reader.readAsDataURL(files[i])
  }
      // this.fileInput.files = e.dataTransfer.files;
      //this.onChange();
     // this.uploadFile
      this.isDragging = false;
    },
    onBack,
    changeSelect(){
      
      if(invoice.value.DirectoryFId){
        let i = 0;
        let check = 0;
        console.log("oui");
        this.diretory.map((v,k)=>{
          console.log("no");
          check++
          if(v.parentId != null){
            if(v.parentId == invoice.value.DirectoryFId){
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
           if(v.DirectoryFId == invoice.value.DirectoryFId){
              if(tour != 0){
                this.listKeys = []
              }
              tour++
              this.listKeys.push({id:v.InvoicekeyId,name:v.Invoicekey})
           }
        })
      }

    },
    removeImageList,
    uploadFile,
    createInvoice
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
  axios
  .get(`${url}/invoiceshow/${this.queryT}`)
  .then((response)=>{
    if(response.data.length > 0){
      this.invoice = response.data[0]
    }
  });
},
created(){
  console.log("QUERY ->",this.$route.query);
  if(this.$route.query.value){
    this.queryT = this.$route.query.value
  }
}
};
</script>

<template>
  <form class="grid grid-cols-2 gap-6 mb-4 relative" @submit.prevent="createInvoice"  enctype="multipart/form-data">
    <div class="w-full rounded overflow-hidden shadow-lg bg-[#fff]">
      <div class="relative px-6 py-6 card-head h-16 text-black">
            <div class="flex flex-col md:flex-row items-center justify-center md:justify-start">
              <div>
                <h1>Add Invoice</h1>
              </div>
            </div>
          </div>
  <div class="px-6 py-4">
    <div class="w-full ">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
       Code
      </label>
      <input v-model="invoice.InvoiceCode" 
       required class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
       id="grid-first-name" 
       type="text" 
       placeholder="Enter Code" >
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Description
      </label>
      <input  v-model="invoice.InvoiceDesc" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Description">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Folder
      </label>
      <div class="relative">
      <select required   v-model="invoice.DirectoryFId"  @change="changeSelect" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password">
          <option  v-for="item in diretory" :key="item.DirectoryId" :value="item.DirectoryId" >  {{ item.DirectoryName }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6" v-if="isEnabled">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Sub Folder
      </label>
      <div class="relative">
      <select  v-model="invoice.subFolder" 
       class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password">
          <option  v-for="item in subDiretory" :key="item.id" :value="item.id"> {{ item.name }}</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
       Barcode
      </label>
      <input  v-model="invoice.InvoiceBarCode" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Enter Barcode">
     
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Date
      </label>
      <input required   v-model="invoice.InvoiceDate" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="date">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Key
      </label>
      <div class="relative">
      <select required   v-model="invoice.InvoiceKeyFId" class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" >
        <option v-for="item in listKeys" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-3">
      <button  class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >
       Submit
      </button>
      <button class="shadow bg-[#222121] hover:bg-[#222121] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="reset">
       Retour
      </button>
  </div>
</div>
  </div>
</div>
  <div class="w-full  bg-white overflow-hidden  rounded-lg shadow-lg ">
    <div class="relative px-6 py-6 card-head h-16 text-black">
            <div class="flex flex-col md:flex-row items-center justify-center md:justify-start">
              <div>
                <h1>Upload Images</h1>
              </div>
            </div>
          </div>
          <div class="px-6 py-4">
      <div class="w-full max-w-xl">
              <div class="drag-area rounded-md border-dashed bg-blue-500 border-2 border-[#fff] h-[295px] mb-8 flex flex-col items-center justify-center mt-[6px] select-none"
                @dragover="dragover"
                @dragleave="dragleave"
                @drop="drop">
                <label for="fileInput" class="relative px-4 rounded-md text-white text-xl cursor-pointer mb-4">
                  <div v-if="isDragging">Release to drop files here.</div>
                  <div v-else>Drop files here </div>
                  <br>
                </label>
               <label class="mb-2">
                <span class="text-white">OR</span>  
               </label>
                <label for="fileInput" class="relative bg-[#fff] px-4 py-2 rounded-md text-blue-300 cursor-pointer mb-4">
                  <span class="">Select a files</span>
                  <input id="fileInput" type="file" name="files" ref="fileInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none" multiple accept=".jpg,.jpeg,.png"  @change="uploadFile">
                </label>
              </div>
              <div class="container grid grid-cols-6 gap-4 p-4">
                  <div class="image"  v-for="(item,index) in previewUrl" :key="index">
                      <span class="delete cursor-pointer ml-2 top-4" @click="removeImageList(index)">&times;</span>
                      <img class="preview-img" :src="item.file" alt="" >
                  </div>
             </div>
      </div>
    </div>
  </div>
</form>
<div class="w-full rounded overflow-hidden shadow-lg bg-[#fff]">
    <div class="grid grid-cols-10 " >
      <img  v-for="item in tabPicture" :key="item.PictureId" alt="soficom" class="w-[100px] h-[150px] mr-3 " :src="item.PublicUrl" >
    </div>
</div>
<div
      :class="`modal ${
        !open && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="open = false"  @click.self=""
      />
      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <div
          class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
             Loading
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="open = false">
              <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
          </div>
          <p>
              {{ msg }}
          </p>
        </div>
      </div>
    </div>
</template>

<style>
    .card .drag-area .visible{
      font-size: 20px;
    }
    .card .container .image span{
    cursor: pointer;
    top: -2px;
    position:absolute;
    font-size: 20px;
    }
    .card .container .image img{
      height: 100%;
      width: 100%;
      border-radius: 5px;
    }
    .card .container .image {
      width: 75px;
      height:75px ;
      margin-left: 5px;
      position: relative;
      margin-bottom: 12px;
    }
    .delete{
      z-index: 999;
      color:#fe0000;
    }

    .card-head{
      background-color: rgba(0,0,0,.03);
    }
    .preview-img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      border: 1px solid #a2a2a2;
      background-color: #a2a2a2;
    }
</style>
<script lang="ts">
import { url, type IDirectory } from '@/composables/api';
import apiClient from '@/composables/http-common';
import type { Invoice } from '@/composables/interface';
import { getUser } from '@/composables/userService';
import axios, { type AxiosResponse } from 'axios';
import AxiosFormData from 'axios-form-data';
import { computed, onMounted, onServerPrefetch, onUpdated, ref, type Ref } from 'vue';

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
      InvoicekeyFId:0,
      dataCreated:'',
      ClientName:'',
      ExpiredDate:getCurrentDate(),
      InvoiceUniqueId:'',
      AndroidVersion:'',
      UserFId:user?.user.UserId,
      InvoiceDate:getCurrentDate(),
      InvoicePath:'',
      BranchFId:user?.user.BranchFId,
  
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
         const rep = await apiClient.post(`${url}/picture`,formData)
         console.log("Reponse image -> ",rep)
         invoice.value.ClientName =""
         invoice.value.ClientPhone =""
         invoice.value.InvoiceBarCode = ""
         invoice.value.InvoiceDate = getCurrentDate()
         invoice.value.InvoiceCode = ""
         invoice.value.InvoiceDesc = ""
         invoice.value.InvoiceUniqueId = ""
         invoice.value.ExpiredDate = getCurrentDate()
          
         if(images.value.length - 1 == k){
          msg.value = "To store"
            open.value = false
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
  const files = event.target.files[0];
  console.log("image ",files)
  images.value.push({name:files.name,file:files,content:files})

  if (files) {
        const reader = new FileReader();
        reader.onload = () => {
          const d = reader.result as string
          const encodedFile = d.split(",")[1];
            previewUrl.value.push({file:reader.result as string,content:encodedFile})
        }  
        reader.readAsDataURL(files);
      }
};

function removeImageList(indice:number){
  previewUrl.value.splice(indice,1)
  images.value.slice(indice,1)
}


const submitFile = async () => {
  const reader = new FileReader();
  reader.readAsDataURL(file.value);
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
        open,
        msg,
        previewUrl,
        isDragging,
        invoice,
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
    onBack,
    changeSelect(){
      console.log("Elie Oko");
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
}
};
</script>
<template>
  <div class="mt-8">
      <h4 class="text-gray-600">
        Create new Invoice
        {{  subDiretory}}
      </h4>
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
           
          </h2>
          <form @submit.prevent="createInvoice"  enctype="multipart/form-data">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="username">Code</label>
                <input
                  v-model.lazy="invoice.InvoiceCode"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700" for="description">Description</label>
                <textarea
                  v-model="invoice.InvoiceDesc"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                ></textarea>
              </div>
              <div>
                <label class="text-gray-700" for="description">Date</label>
                <input
                  v-model="invoice.InvoiceDate"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="date"
                />
              </div>
              <div>
                <label class="text-gray-700" for="invoiceBarcode">Barcode</label>
                <input
                  v-model="invoice.InvoiceBarCode"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                >
              </div>
              <div>
                <label class="text-gray-700" for="folder">Folder</label>
                <select  v-model="invoice.DirectoryFId"
                @change="changeSelect"
                 class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    <option v-for="item in diretory" :key="item.DirectoryId" :value="item.DirectoryId">
                     {{ item.DirectoryName }}
                    </option>
                </select>
              </div>

              <div v-if="isEnabled">
                <label class="text-gray-700" for="password">SubFolder</label>
                <select  v-model="invoice.subFolder" 
                 class="w-full  mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    <option v-for="item in subDiretory" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                </select>
              </div>
              <div>
                <label class="text-gray-700" for="password">Key</label>
                <select  v-model="invoice.InvoicekeyFId"
                 class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                    <option v-for="item in listKeys" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                </select>
              </div>

              <div>
                <label class="text-gray-700" for="clientName">Client name</label>
                <input
                  v-model="invoice.ClientName"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                >
              </div>

              <div>
                <label class="text-gray-700" for="clientPhone">Client phone</label>
                <input
                  v-model="invoice.ClientPhone"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text"
                >
              </div>
              <div>
                <label class="text-gray-700" for="dateExpire">Date expire</label>
                <input
                  v-model="invoice.ExpiredDate"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="date"
                >
              </div>

            </div>
            <div class="card w-full p-10 shadow-lg rounded overflow-hidden text-base">
              <div class="top text-center font-bold text-[#fe0000]">
                  <p>Drag & drop images</p>
              </div>
              <div class="drag-area rounded-sm border-dashed border-2 border-[#fe0000] h-[195px] mb-8 flex items-center justify-center mt-[10px] select-none">
                  <span v-if="!isDragging">Drap & drop image here or 
              
                    <input type="file" name="files" class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700" id="" ref="fileInput" multiple @change="uploadFile">
                  </span>
                  <div v-else class="select ml-4 cursor-pointer text-[#18318a] transition-[0.4s] hover:opacity-[0.6]">
                      Drop image here
                  </div>
              </div>
              <div class="container flex p-4">
                  <div class="image"  v-for="(item,index) in previewUrl" :key="index">
                      <span class="delete " @click="removeImageList(index)">&times;</span>
                      <img :src="item.file" alt="" >
                  </div>
              </div>
            </div>
            <div>
         
            </div>
            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
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
             Status
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
<style >
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

</style>

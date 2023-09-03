<script   lang="ts">

import { getUser } from '@/composables/userService';
import { ref } from 'vue'
import axios from 'axios';
import type { IMultiple, Invoice } from '@/composables/interface';
import { url } from '@/composables/api';

interface User {
  name: string
  email: string
  title: string
  title2: string
  status: string
  role: string
}

const testUser: User = {
  name: 'John Doe',
  email: 'john@example.com',
  title: 'Software Engineer',
  title2: 'Web dev',
  status: 'Active',
  role: 'Owner',
  
}
const listHeader:Array<string> =[
  "code",
  "description",
  'barcode',
  'directory',
  'key',
  'branch',
  'user'
]
const user =  getUser()
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
      BranchFId:user?.user.BranchFId
})
console.log(getUser())
const open = ref(false)
const msg = ref('')
const users = ref<User[]>([...Array(1).keys()].map(() => testUser))
//
function noBack(){
  open.value = true
}
async function deleteInvoice(id:number){
  try {

    const response = await axios.delete(`${url}/invoice/${id}`);
    alert(response.data.message);
  } catch (error) {
  }
 
}

 

export default{
  created() {
    this.getInvoice()

  },
  data(){
    return{
      open,
      msg,
      isVisibility:false,
      file:'',
      listHeader,
      users,
      stock:[{}] as Array<Array<IMultiple>> ,
      allData:[{}] as Array<Array<IMultiple>>,
      invoices
    }
  },
  methods:{
    async update(data:any){
  try{
    const id =data.invoice.InvoiceId
    this.$data.open.value = true
    this.$data.msg.value = "Chargement encours"
    if(invoices.value.InvoiceDesc != "" && invoices.value.InvoiceBarCode != "" ){
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       this.getInvoice();
       console.log("Versus -> ",response)
       this.$data.msg.value = "Success"
    }
    else if(invoices.value.InvoiceDesc == "" && invoices.value.InvoiceBarCode != ""){
      invoices.value.InvoiceDesc = data.invoice.InvoiceDesc;
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       this.getInvoice();
       console.log("Versus -> ",response)
       this.$data.msg.value = "Success"
    }
    else{
       invoices.value.InvoiceBarCode = data.invoice.InvoiceBarCode;
       const dataInvoice = JSON.parse(JSON.stringify(invoices.value))
       console.log("est-<",dataInvoice)
       const response = await axios.put(`${url}/invoicesput/${id}`,dataInvoice)
       this.getInvoice();
       console.log("Versus -> ",response)
       this.$data.msg.value = "Success"
    }
    
    
  }
  catch (error){

  }
},
    async getInvoice(){
    
    axios.get(`${url}/getAllPicture`).then((response)=>{    
       this.allData  = response.data
       this.stock  = (Object.entries(this.allData ).map(([key, value]) => {
    return { id: parseInt(key), ...value };
      })) as Array<Array<IMultiple>>;
      console.log(this.stock.length);
      console.log(this.stock );
      console.log(this.$data.allData);
    });
    },
    async deleteInvoice(id:number){
      alert(id)
      try {
        const response = await axios.delete(`${url}/invoice/${id}`);
        this.getInvoice();
        alert(response.data.message);
      } catch (error) {   
      }
    
    },
    editActivate(id:number){
       console.log("Oui")
       this.$data.stock.map((v,_k)=>{
          if(v[0].invoice.InvoiceId == id){
            if(v[0].isActive){
              v[0].isActive = false
            }
            else{
              v[0].isActive = true
            }
          }
       })
    }
  },
  mounted(){
    this.getInvoice()
    this.isVisibility
    this.$data.stock
  }

}
</script>


<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Dashboard
    </h3>
 
    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
          >
            <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                4
              </h4>
              <div class="text-gray-500">
                Your invoice
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
          >
            <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                  fill="currentColor"
                />
                <path
                  d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                200,521
              </h4>
              <div class="text-gray-500">
                Total Orders
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
          >
            <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                215,542
              </h4>
              <div class="text-gray-500">
                Available Products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
           
    <div class="overflow-hidden bg-white rounded shadow-lg p-4 mb-2"  v-for="(u, index) in stock" :key="index">

<div class="px-4 sm:px-0">
  <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and invoice application.</p>
</div>
<div class="inline-block min-w-full  align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table class="min-w-full">
        <thead>
          <tr>
            <th v-for="(item,index) in listHeader" :key="index" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                {{ item }}
            </th>
          </tr>
        </thead>

        <tbody class="bg-white">
          <tr >
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"  >
              <span class="text-sm font-medium leading-5 text-gray-900">
                {{ u[0].invoice.InvoiceCode }}
              </span>
                <!-- <div class="relative mb-3" v-else>
                  <input
                    v-model.lazy="invoices.InvoiceCode"
                    type="text"
                    class="peer m-0 block h-[58px] w-[140px] rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                      />
                  <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >CodeInvoice</label
                  >
                </div> -->
            </td>
            <td
              class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
            >
              <sapn class="text-sm leading-5 text-gray-900" v-if="!u[0].isActive">
                {{ u[0].invoice.InvoiceDesc }}
              </sapn>
              <div class="relative mb-3" v-else="">
                  <input
                    v-model.lazy="invoices.InvoiceDesc"
                    type="text"
                    class="peer m-0 block h-[58px] w-[140px] rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    id="floatingInput"
                    placeholder="" />
                  <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Description</label
                  >
                </div>
            </td>

            <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
              <sapn class="text-sm leading-5 text-gray-900" v-if="!u[0].isActive">
                {{ u[0].invoice.InvoiceBarCode }}
              </sapn>
              <div class="relative mb-3" v-else>
                  <input
                    v-model.lazy="invoices.InvoiceBarCode"
                    type="text"
                    class="peer m-0 block h-[58px] w-[140px] rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    id="floatingInput"
                    placeholder="" />
                  <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Barcode</label
                  >
                </div>
            </td>
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full" >
                {{ u[0].invoice.directory?.DirectoryName }}
              </span>
              <!-- <div class="relative mb-3" v-else>
                  <input
                    type="text"
                    class="peer m-0 block h-[58px] w-[140px] rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    id="floatingInput"
                    placeholder="" :value="u[0].invoice.directory?.DirectoryName" />
                  <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Directory</label
                  >
                </div> -->
            </td>
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {{ u[0].invoice.invoicekey?.Invoicekey }}
              </span>
              <!-- <div class="relative mb-3" v-else>
                  <input
                    type="text"
                    class="peer m-0 block h-[58px] w-[140px] rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-2 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                    id="floatingInput"
                    placeholder="" :value="u[0].invoice.invoicekey?.Invoicekey" />
                  <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Key</label
                  >
                </div> -->
            </td>
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {{ u[0].invoice.user?.branch?.BranchName }}
              </span>
            </td>
            <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {{ u[0].invoice.user?.username}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
</div>
      <div
    class="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    role="toolbar">
    <button
      type="button"
      class="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      @click="editActivate(u[0].InvoiceFId)" 
      >
      {{ u[0].isActive?"Cancel":"Edit" }}
    </button>
    <button v-if="u[0].isActive"
      type="button"
      @click="update(u[0])"
      class="inline-block bg-[#29cd44] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
      data-te-ripple-init
      data-te-ripple-color="light">
      Save
    </button>
    <button
      type="button"
      class="inline-block bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-red-700"
      data-te-ripple-init
      data-te-ripple-color="light" @click="deleteInvoice(u[0].InvoiceFId)">
      Delete
    </button>

  </div>

  <div class="flex flex-wrap -mx-6 ">
    <div v-for="item in u" :key="item.PictureId" class="relative max-w-[13rem] overflow-hidden bg-cover bg-no-repeat">
      <img
        class="rounded-t-lg h-[123px]"
        :src="item.PublicUrl" 
        
        />
    </div>
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
             Error
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

</style>
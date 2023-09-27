import {defineStore} from 'pinia'
//@ts-ignore
import { IUserApp } from './interface'


export const useTestStore = defineStore('archive', {
    state: () => {
        return{
            username: {} as IUserApp
        }
    }, 
    actions:{
        changeUsername (payload:IUserApp) {
            this.username = payload
        }
    }
})
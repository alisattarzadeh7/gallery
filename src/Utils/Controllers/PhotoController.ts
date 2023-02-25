import {AxiosRequestConfig} from "axios";
import {IRequestOptions, Request} from "~/src/Utils/Facades/Request";
import ListHandler from "~/src/Utils/Handlers/ListHandler";
import Photo from "~/src/Utils/Entities/Photo";

export class PhotoController{

    static async getAllImages({ssr}:{ssr?:boolean} = {ssr:false},requestOptions?:AxiosRequestConfig | undefined){
        try{
            const result = await Request.call({url:'/api/photos?populate=*',requestOptions})
            if(ssr)
                return result
            return ListHandler.handle(result.response,Photo)
        }catch (e){
            if(!ssr)
                return e
        }
    }


    static async addNewPhoto(data:any){
        try{
            return  Request.call({url:'/api/photos',method:'POST',data})
        }catch(e){

        }
    }


    static async getPhotoById(id:string,{ssr}:{ssr?:boolean} = {ssr:false},requestOptions?:AxiosRequestConfig | undefined){
        try{
            const result = await  Request.call({url:`/api/photos/${id}?populate=*`,requestOptions})
            if(ssr)
                return result
            return Photo.create(result.response.data)
        }catch(e){
            if(!ssr)
                return e
        }


    }

}
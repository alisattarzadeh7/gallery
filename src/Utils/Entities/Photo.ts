import {Request} from "~/src/Utils/Facades/Request";
import ListHandler from "~/src/Utils/Handlers/ListHandler";


interface ImageFormat{
    name: string,
    hash: string,
    ext: string,
    mime: string,
    path: string,
    width: number,
    height: number,
    size: number,
    url: string
}

export  default  class Photo{

    id!:string;
    name!:string;
    date!:string | Date;
    alternativeText!:string;
    caption!:string;

    img!:{
        thumbnail:ImageFormat,
        large:ImageFormat,
        medium:ImageFormat,
        small:ImageFormat
    };

    static create(params:any){
        const photo = new Photo()
        photo.id = params.id
        photo.name = params.attributes?.name
        photo.date = params.attributes?.Date
        photo.img = {
            thumbnail:params.attributes?.Img?.data?.attributes?.formats?.thumbnail ? {...params.attributes?.Img?.data?.attributes?.formats.thumbnail,url:`http://localhost:1337${params.attributes?.Img?.data?.attributes?.formats?.thumbnail?.url}`} : undefined,
            large:params.attributes?.Img?.data?.attributes?.formats?.large ? {...params.attributes?.Img?.data?.attributes?.formats.large,url:`http://localhost:1337${params.attributes?.Img?.data?.attributes?.formats?.large?.url}`} : undefined,
            medium:params.attributes?.Img?.data?.attributes?.formats?.medium ? {...params.attributes?.Img?.data?.attributes?.formats.medium,url:`http://localhost:1337${params.attributes?.Img?.data?.attributes?.formats?.medium?.url}`} : undefined,
            small:params.attributes?.Img?.data?.attributes?.formats?.small ? {...params.attributes?.Img?.data?.attributes?.formats.small,url:`http://localhost:1337${params.attributes?.Img?.data?.attributes?.formats?.small?.url}`} : undefined,
        }
        photo.caption = params.attributes?.Img?.data?.attributes?.caption
        photo.alternativeText = params.attributes?.Img?.data?.attributes?.alternativeText
        return photo
    }






}
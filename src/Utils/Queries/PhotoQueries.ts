import {useQuery, UseQueryResult} from "react-query";
import {PhotoController} from "~/src/Utils/Controllers/PhotoController";
import Photo from "~/src/Utils/Entities/Photo";
import ListHandler from "~/src/Utils/Handlers/ListHandler";
import {AppQueryOptions} from "~/src/Utils/types/global";

export const useAllPhotos = (queryOptions?:AppQueryOptions): UseQueryResult<ListHandler<Photo>> =>{
    return useQuery('allPhotos', ()=>PhotoController.getAllImages(),queryOptions)
}

export const usePhotoById = (id:string,queryOptions?:AppQueryOptions):UseQueryResult<Photo>=>{
    return useQuery('allPhotos', ()=>PhotoController.getPhotoById(id),queryOptions)
}
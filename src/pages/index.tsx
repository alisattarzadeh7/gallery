import {Grid} from "@mui/material";
import {GetServerSideProps, NextPage} from "next";
import React, { useState} from "react";
import AddPhotoDialog from "~/components/HomeComponets/AddPhotoDialog";
import MainBanner from "~/components/HomeComponets/MainBanner";
import PhotoCard from "~/components/PhotoCard";
import {PhotoController} from "~/src/Utils/Controllers/PhotoController";
import Photo from "~/src/Utils/Entities/Photo";
import ListHandler from "~/src/Utils/Handlers/ListHandler";
import {useAllPhotos} from "~/src/Utils/Queries/PhotoQueries";
import Route from "~/src/Utils/Facades/Route";


interface IHomeProps {
    images: any
}

const Home: NextPage<IHomeProps> = ({images}) => {
    const photos = ListHandler.handle(images,Photo)
    const {data:allPhotos,refetch} = useAllPhotos({initialData:photos})
    const [addPhotoModal,setAddPhotoModal] = useState(false)

    const handleAddPhotoModal = ()=>{
        setAddPhotoModal(true)
    }

    return (
        <div>

            {
                allPhotos?.data && <MainBanner photos={allPhotos.data}/>
            }
            <Grid container>
                {
                    allPhotos?.data?.map(photo=>{
                        return (<Grid item key={photo.id} xs={12} md={6}  lg={4}>
                            <PhotoCard imgSrc={photo.img.thumbnail.url} id={photo.id} title={photo.caption} />
                        </Grid>)
                    })
                }
            </Grid>
            <AddPhotoDialog refetchData={refetch} setOpen={setAddPhotoModal} open={addPhotoModal} />
            <button onClick={handleAddPhotoModal}>add New Photo</button>
        </div>
    )
}


export const getServerSideProps:GetServerSideProps = async (context) => {
    const cookies = context.req.cookies
    if(!cookies.bearerToken)
        return {
            redirect: {
                permanent: false,
                destination: Route.Login.path,
            },
            props:{},
        };
    let images :{data:Photo[]} | undefined
    try{
        const result:any = await PhotoController.getAllImages({ssr:true},{
            headers:{
                Authorization:`Bearer ${cookies.bearerToken}`
            }
        })


        if(result?.errors?.response?.status == '403')
        return {
            redirect: {
                permanent: false,
                    destination: Route.Login.path,
            },
            props:{},
        }
        if(result.isSuccess)
        {
            images = result?.response.data
        }
    }catch(e){

    }

    return {
        props: {images},
    }


}


export default Home
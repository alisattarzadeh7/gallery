import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import React from "react"
import {PhotoController} from "~/src/Utils/Controllers/PhotoController";
import Photo from "~/src/Utils/Entities/Photo";
import Route from "~/src/Utils/Facades/Route";
import {usePhotoById} from "~/src/Utils/Queries/PhotoQueries";
import Image from "next/image"

interface IImagePageProps {
    photo: any
}

const ImagePage: NextPage<IImagePageProps> = ({photo}) => {
    const {data} = usePhotoById(photo.id, {initialData: photo})

    return (
        <>
            {
                data?.img?.large?.url &&
                <Image src={data?.img.large.url} alt={data?.alternativeText} fill></Image>
            }
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async(context) => {
    const cookies = context.req.cookies
    if(!cookies.bearerToken)
        return {
            redirect: {
                permanent: false,
                destination: Route.Login.path,
            },
            props:{},
        };
    let photo: { data: Photo } | undefined
    const {params} = context;
    try {
        const result:any = await PhotoController.getPhotoById(params?.id?.toString() as string, {ssr: true},{
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
            photo = result.response?.data
        }
    } catch (e) {

    }
    return {
        props: {
            photo: photo,
        },
    }
}

export default ImagePage
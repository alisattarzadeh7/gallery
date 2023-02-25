import {motion} from "framer-motion";
import Image from "next/image";
import React, { memo } from "react"
import {Swiper, SwiperSlide} from 'swiper/react';
import Photo from "~/src/Utils/Entities/Photo";

interface IMainBannerProps {
    photos: Photo[]
}


const captionVariant = {
    hidden:{
        opacity:0,
        y:50
    },
    visible:{
        opacity:1,
        y:0,
        transition:{
            duration:1
        }
    },
    exit:{
        opacity:0,
        y:50
    }
}

const BannerCaption = ({caption}:{caption:string})=>{

    return (<motion.div className="text-white absolute z-10 w-full h-full flex items-center p-20 text-4xl" initial="hidden" animate="visible" exit="exit" variants={captionVariant}>
        {caption}
    </motion.div>)


}



const MainBanner: React.FC<IMainBannerProps> = ({photos}) => {
    return (
        <>
            <Swiper>
                {
                    photos?.slice(0,3).map((photo) =>
                        <SwiperSlide>
                            {({ isActive }) => (
                                <div  className="w-100 h-[90vh] flex relative">
                                    {
                                        isActive &&
                                        <BannerCaption caption={photo.caption}/>
                                    }
                                    <Image src={photo.img?.large?.url}
                                           alt={photo.alternativeText} fill/>
                                </div>
                            )}

                        </SwiperSlide>)
                }

            </Swiper>
        </>
    )
}

export default memo(MainBanner)
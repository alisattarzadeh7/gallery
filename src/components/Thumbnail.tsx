import { motion } from "framer-motion"
import Image from "next/image";
import Link from "next/link"
import React from "react"
import Photo from "~/src/Utils/Entities/Photo";

interface IThumbnailProps {
    img:Photo;
    alt:string
}

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
        scale: 0.5,
        opacity: 0,
        transition
    }
};


const frameVariants = {
    hover: { scale: 0.95 }
};

const imageVariants = {
    hover: { scale: 1.1 }
};

const Thumbnail: React.FC<IThumbnailProps> = ({img,alt}) => {
    return (
        <motion.div className="thumbnail" variants={thumbnailVariants}>
            <motion.div
                className="frame"
                whileHover="hover"
                variants={frameVariants}
                transition={transition}
            >
                <Link  href={`/image/${img.id}`}>
                    <motion.div
                        variants={imageVariants}
                        transition={transition}
                        style={{width:50,height:100}}
                    >
                        <Image     src={img.img?.thumbnail?.url}
                                   alt={alt} width={200} height={200}/>
                    </motion.div>
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default Thumbnail
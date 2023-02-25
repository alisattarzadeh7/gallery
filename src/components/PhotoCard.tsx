import {CardActions, CardContent, Typography, Button, CardMedia, Card} from "@mui/material"
import Link from "next/link";
import React, {memo} from "react"
import Route from "~/src/Utils/Facades/Route";

interface ICustomCardProps {
    id:string;
    imgSrc:string;
    title:string;
}

const PhotoCard: React.FC<ICustomCardProps> = ({
                                                   id,
                                                   imgSrc,
                                                   title,
                                               }) => {
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={imgSrc}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link  href={Route.Image.getPathWithParams({id})}>more</Link>
                </CardActions>
            </Card>
        </>
    )
}

export default memo(PhotoCard)
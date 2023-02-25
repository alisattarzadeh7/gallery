import {AppBar, IconButton, Toolbar, Typography} from "@mui/material"
import Link from "next/link";
import React, {useRef} from "react"
import CustomMenu, {IMenuMethods} from "~/components/CustomMenu";
import Route from "~/src/Utils/Facades/Route";
import {useAppDispatch, useAppSelector} from "~/src/Utils/Hooks";
import {changeLanguage} from "~/src/Utils/Redux/Slices/layout";

interface ITopBarProps {

}

const TopBar: React.FC<ITopBarProps> = () => {
    const langRef = useRef<IMenuMethods>()
    const language = useAppSelector(state=>state.layout.language)
    const dispatch = useAppDispatch()
    return (
        <>
            <AppBar position="absolute">
                <Toolbar variant="dense" className="flex justify-between">
                    <Link href={Route.Home.path}>
                        <Typography variant="h6" color="inherit" component="div">
                            Photos
                        </Typography>
                    </Link>
                    <div>
                        <CustomMenu ref={langRef}  options={[{
                            content:language === 'en' ? 'fa' : 'en',
                            onClick:()=>{
                                dispatch(changeLanguage(language === 'en' ? 'fa' : 'en'))
                                langRef.current?.handleCloseMenu()
                            }
                        }]}/>
                        <IconButton  onClick={(e)=>{
                            langRef.current?.handleOpenMenu(e)
                        }} className="!text-white">{language}</IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default TopBar
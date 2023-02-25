import React, {ReactElement} from "react"
import TopBar from "~/components/Layout/TopBar";
import {useAppSelector} from "~/src/Utils/Hooks";

interface IindexProps {
    children:ReactElement
}

const index: React.FC<IindexProps> = ({children}) => {
    const direction = useAppSelector(state=>state.layout.direction)
    const mode = useAppSelector(state=>state.layout.mode)
    return (
        <>
            <div className={`${direction} ${mode}`}>
                <TopBar/>
                {children}
            </div>
        </>
    )
}

export default index
import React from "react"
import {useAppSelector} from "~/src/Utils/Hooks/index";

interface IuseIsRtlProps {

}

const useIsRtl = ():boolean => {
    const direction = useAppSelector((state)=>state.layout.direction)
    return direction === 'rtl'
}

export default useIsRtl
import React, {ReactElement} from "react"

interface IToastifyProviderProps {
    children:ReactElement
}
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastifyProvider: React.FC<IToastifyProviderProps> = ({children}) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default ToastifyProvider
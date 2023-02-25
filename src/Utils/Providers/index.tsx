import React, {ReactElement} from "react"
import MuiProvider from "~/src/Utils/Providers/MuiProvider";
import ReactQueryProvider from "~/src/Utils/Providers/ReactQueryProvider";
import ReduxProvider from "~/src/Utils/Providers/ReduxProvider";
import ToastifyProvider from "~/src/Utils/Providers/ToastifyProvider";


interface IMainProviderProps {
    children: ReactElement
}

const MainProvider: React.FC<IMainProviderProps> = ({children}) => {
    return (<>
        <ReduxProvider>
            <ToastifyProvider>
                <ReactQueryProvider>
                    <MuiProvider>
                        {children}
                    </MuiProvider>
                </ReactQueryProvider>
            </ToastifyProvider>
        </ReduxProvider>
    </>)
}


export default MainProvider
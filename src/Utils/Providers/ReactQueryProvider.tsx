import React, {ReactElement} from "react"
import {QueryClient, QueryClientProvider} from "react-query";

interface IReactQueryProviderProps {
    children:ReactElement
}
const queryClient = new QueryClient()
const ReactQueryProvider: React.FC<IReactQueryProviderProps> = ({children}) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    )
}

export default ReactQueryProvider
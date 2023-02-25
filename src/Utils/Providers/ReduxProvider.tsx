import React, {ReactElement} from "react"
import {JSXElement} from "@babel/types";
import { Provider } from "react-redux";
import store from "~/src/Utils/Redux/store";
interface IReduxProviderProps {
    children:ReactElement
}

const ReduxProvider: React.FC<IReduxProviderProps> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider
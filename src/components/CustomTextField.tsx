import {StandardTextFieldProps, TextField} from "@mui/material";
import {InputProps } from "@mui/material/Input/Input";
import React from "react"

interface ICustomTextFieldProps  extends StandardTextFieldProps{
    value?:string | number;
    label?:string ;
    onChange?:InputProps['onChange'];
    error?:boolean
}

const CustomTextField: React.FC<ICustomTextFieldProps> = (props) => {
    return (
        <>
            <TextField id="outlined-basic"  variant="outlined" {...props}  />
        </>

    )
}

export default CustomTextField
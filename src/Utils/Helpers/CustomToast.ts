import {toast, TypeOptions} from "react-toastify";

export default function CustomToast(msg:string,type:TypeOptions){
    toast(msg,{type})
}
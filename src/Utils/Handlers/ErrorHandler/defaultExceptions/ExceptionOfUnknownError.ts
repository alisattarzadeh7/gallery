import { AxiosError } from 'axios';
import CustomToast from "~/src/Utils/Helpers/CustomToast";
import {IDefaultException} from "~/src/Utils/Handlers/ErrorHandler";


const unknownErrorHandler: IDefaultException = (error: AxiosError) => {
  // do something with the unknown errors

  CustomToast(error.message,'error')
};

export default unknownErrorHandler;

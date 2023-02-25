import { AxiosError } from 'axios';
import {IDefaultException} from "~/src/Utils/Handlers/ErrorHandler";
import CustomToast from "~/src/Utils/Helpers/CustomToast";

const ExceptionOf401: IDefaultException = async (error: AxiosError) => {
  // do something with the 401 error

  CustomToast(error.message,'error')
};

export default ExceptionOf401;

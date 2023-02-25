import { AxiosError } from 'axios';
import CustomToast from "~/src/Utils/Helpers/CustomToast";
import {IDefaultException} from "~/src/Utils/Handlers/ErrorHandler";
const defaultNotFound: IDefaultException = (error: AxiosError) => {
  // do something with the 404 error

  CustomToast(error.message,'error')
};

export default defaultNotFound;

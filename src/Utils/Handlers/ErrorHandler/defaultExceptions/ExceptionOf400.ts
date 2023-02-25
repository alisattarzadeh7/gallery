import { AxiosError } from 'axios';
import CustomToast from "~/src/Utils/Helpers/CustomToast";

export default (error: any) => {
  // do something with the 400 error

  CustomToast(error?.response?.data?.error?.message,'error')
};

import { AxiosError } from 'axios';
import CustomToast from "~/src/Utils/Helpers/CustomToast";

export default (error: AxiosError) => {
  // do something with the 429 error

  CustomToast(error.message,'error')
};

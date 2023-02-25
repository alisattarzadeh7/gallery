import {AxiosError} from "axios";
import CustomToast from "~/src/Utils/Helpers/CustomToast";

const ExceptionOf422 = (error:AxiosError) => {
  // do something with the 422 error

  CustomToast(error.message,'error')
};

export default ExceptionOf422;

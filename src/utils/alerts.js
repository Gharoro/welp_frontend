import { toast } from "react-toastify";

const alertSuccess = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    autoClose: false
  });
};

const alertError = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    autoClose: false
  });
};

export {alertSuccess, alertError};


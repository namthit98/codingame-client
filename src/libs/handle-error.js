import { toast } from "react-toastify";

export const handleError = (err) => {
  if (err && err.response) {
    const data = err.response.data;

    if (data.message) {
      return toast.error(data.message);
    }

    return toast.error("Server is error !");
  }
};

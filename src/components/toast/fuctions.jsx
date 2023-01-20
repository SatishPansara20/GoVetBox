
import "react-toastify/dist/ReactToastify.css";

//import { useSelector, useDispatch } from "react-redux";
import { toastAction } from "../../Redux/commonSlice";

export const makeToast = (dispatch, receivedToastData,type) => {
  return (
    // console.log(receivedToastData);
    type(receivedToastData, {
      position: "top-right",
      onClose: () => {
        dispatch(toastAction(""));
      },
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  );
};



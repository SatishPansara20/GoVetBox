import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

//import { useSelector, useDispatch } from "react-redux";
import { toastAction } from "../../../Redux/commonSlice";

export const makeToast = (dispatch, receivedToastData, type) => {
  return type(receivedToastData, {
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
  });
};

// NOTE: Fatch Data
export const useFetchData = (requesMethod, payload) => {
  const [data, setData] = useState();
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await requesMethod(payload, {
          refetchOnMountOrArgChange: true,
        });
        if (isMounted) {
          setData(response);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(payload);

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
  }, [requesMethod, payload]);

  return { data, fetchError, isLoading };
};

// NOTE: Window Size
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

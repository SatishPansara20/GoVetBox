import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

//import { useSelector, useDispatch } from "react-redux";
import { useGetShipmentMutation } from "../../../Redux/ReduxApi";
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
  const [getShipment] = useGetShipmentMutation();
  const [data, setData] = useState();
  const [fetchError, setFetchError] = useState(null); // null means false
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (payload) => {
      setIsLoading(true);
      try {
        const response = await getShipment(payload);

        if (isMounted) {
          setData(response);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setIsError(true);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false) && setIsError(false);
      }
    };

    fetchData(payload);

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
  }, [getShipment, requesMethod]);

  return { data, isError, fetchError, isLoading };

  // {isLoading && <p className="statusMsg">Loading posts...</p>}
  // {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
  // {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No posts to display.</p>)}
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

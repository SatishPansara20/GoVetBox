import { useState, useEffect, useCallback, useLayoutEffect } from "react";

import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";

import "react-toastify/dist/ReactToastify.css";

import {
  useGetApprovedPatientListMutation,
  useGetShipmentDetailURLMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useGetDashboardataMutation,
  useUpdateShipmentMutation,
  useAddShipmentMutation,
  useDeleteShipmentMutation,
  useGetShipmentMutation,
} from "../../../Redux/ReduxApi";
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
  const [approvedPatientList] = useGetApprovedPatientListMutation();
  const [ShipmentDetail] = useGetShipmentDetailURLMutation();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();
  const [updateShipment] = useUpdateShipmentMutation();
  const [addShipment] = useAddShipmentMutation();
  const [dashboardData] = useGetDashboardataMutation();
  const [deleteShipment] = useDeleteShipmentMutation();

  const [data, setData] = useState();
  const [fetchError, setFetchError] = useState(null); // null means act as false
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // console.log("Received Method name :", requesMethod);
        // console.log("Received payload :", payload);
        switch (requesMethod) {
          case "getShipment":
            if (payload.start < 0) {
              payload({
                ...payload,
                start: 0,
              });
            }

            if (
              payload.sort !== "" &&
              payload.sort !== undefined &&
              payload.sort !== null &&
              payload.dir !== "" &&
              payload.dir !== undefined &&
              payload.dir !== null
            ) {
              //   await delay();
              const gs = await getShipment(payload, {
                refetchOnMountOrArgChange: true,
              });

              if (isMounted && gs.data.status === 200) {
                setData(gs);
                setIsLoading(false);
                setFetchError(null);
              } else {
                alert(gs);
              }
            } else {
              //  await delay();
              const gs = await getShipment({
                length: payload.length,
                search: payload.search,
                start: payload.start,
              });

              if (isMounted && gs.data.status === 200) {
                setData(gs);
                setIsLoading(false);
                setFetchError(null);
              } else {
                alert(gs);
              }
            }
            break;
          case "approvedPatientList":
            const ap = await approvedPatientList(payload);
            if (isMounted) {
              setData(ap);
              setIsLoading(false);
              setFetchError(null);
            }
            break;
          case "ShipmentDetail":
            // await delay();
            const sd = await ShipmentDetail(payload);
            if (isMounted && sd.status === 400) {
              alert(sd.message);
            } else if (isMounted && Object.keys(sd.data).length > 0) {
              setData(sd);
              setIsLoading(false);
              setFetchError(null);
            }

            break;
          case "PatientAddress":
            if (payload !== "") {
              const pa = await PatientAddress({
                length: 10000,
                patientId: payload,
                start: 0,
              });
              if (isMounted) {
                setData(pa);
                setIsLoading(false);
                setFetchError(null);
              }
            }

            break;
          case "AllMedication":
            if (payload !== "") {
              const am = await AllMedication({ _id: payload });
              if (isMounted) {
                setData(am);
                setIsLoading(false);
                setFetchError(null);
              }
            } else {
              console.log("AllMedication id :", payload);
            }

            break;
          case "updateShipment":
            const us = await updateShipment(payload);
            if (isMounted) {
              setData(us);
              setIsLoading(false);
              setFetchError(null);
            }
            break;
          case "addShipment":
            const ads = await addShipment(payload);
            if (isMounted) {
              setData(ads);
              setIsLoading(false);
              setFetchError(null);
            }
            break;
          case "dashboardData":
            // await delay();
            const dbs = await dashboardData();
            if (isMounted) {
              setData(dbs);
              setIsLoading(false);
              setFetchError(null);
            }
            break;
          case "deleteShipment":
            const ds = await deleteShipment(payload);
            if (isMounted) {
              setData(ds);
              setIsLoading(false);
              setFetchError(null);
            }
            break;
          default:
            alert("Unknown API Method");
        }
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
          setFetchError(err.message);
          setIsError(true);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false) && setIsError(false);
      }
    };

    fetchData();

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    requesMethod,
    payload,
    //   getShipment,
    //   AllMedication,
    //   PatientAddress,
    //  // ShipmentDetail,
    //   addShipment,
    //   dashboardData,
    //   deleteShipment,
    //   //approvedPatientList,
    //   updateShipment,
  ]);

  return { isError, fetchError, isLoading, data };
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

// Hook
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};

// Hook
export function useRouter(path) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch(path);
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes

  // const [push, setPush] = useState(null);
  // const [replace, setReplace] = useState(null);
  // const [pathname, setPathname] = useState("");
  // const [query, setQuery] = useState({});

  // useEffect(() => {
  //   setPush(navigate(path));
  //   setReplace(navigate(path, { replace: true }));
  //   setPathname(location.pathname);
  //   setQuery({
  //     ...queryString.parse(location.search), // Convert string to object
  //     ...params,
  //   });
  // }, [location.pathname, location.search, navigate, params, path, query]);

  return useMemo(
    (path) => {
      return {
        // For convenience add push(), replace(), pathname at top level
        pathname: location.pathname,
        // Merge params and parsed query string into single "query" object
        // so that they can be used interchangeably.
        // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
        query: {
          ...queryString.parse(location.search), // Convert string to object
          ...params,
        },
        // Include match, location, navigate objects so we have
        // access to extra React Router functionality if needed.
        match,
        location,
        navigate,
      };
    },
    [location, params, match, navigate]
  );
}

// Hook
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

// Hook
export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

// Hook
export function useAnimation(easingName = "linear", duration = 500, delay = 0) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}
// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};
function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);
  useEffect(
    () => {
      let animationFrame, timerStop, start;
      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }
      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }
      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);
        // Start the loop
        start = Date.now();
        loop();
      }
      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );
  return elapsed;
}

// Hook
export function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  // Function that gets value based on matching media query
  const getValue = useCallback(() => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  }, [defaultValue, mediaQueryLists, values]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue);
  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [getValue, mediaQueryLists] // Empty array ensures effect is only run on mount and unmount
  );
  return value;
}

// Hook
export function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}

// Hook
export function useTheme(theme) {
  useLayoutEffect(
    () => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}

import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

//import { useSelector, useDispatch } from "react-redux";
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
  const [fetchError, setFetchError] = useState(null); // null means false
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

  useEffect(() => {
    let isMounted = true;
    const fetchData = async (payload) => {
      setIsLoading(true);

      try {
        switch (requesMethod) {
          case "getShipment":
            const gs = await getShipment(payload);
            if (isMounted) {
              setData(gs);
              setFetchError(null);
            }
            break;
          case "approvedPatientList":
            const ap = await approvedPatientList(payload);
            if (isMounted) {
              setData(ap);
              setFetchError(null);
            }
            break;
          case "ShipmentDetail":
            const sd = await ShipmentDetail(payload);
            if (isMounted) {
              setData(sd);
              setFetchError(null);
            }
            break;
          case "PatientAddress":
            const pa = await PatientAddress(payload);
            if (isMounted) {
              setData(pa);
              setFetchError(null);
            }
            break;
          case "AllMedication":
            const am = await AllMedication(payload);
            if (isMounted) {
              setData(am);
              setFetchError(null);
            }
            break;
          case "updateShipment":
            const us = await updateShipment(payload);
            if (isMounted) {
              setData(us);
              setFetchError(null);
            }
            break;
          case "addShipment":
            const ads = await addShipment(payload);
            if (isMounted) {
              setData(ads);
              setFetchError(null);
            }
            break;
          case "dashboardData":
            await delay();
            const dbs = await dashboardData();
            if (isMounted) {
              setData(dbs);
              setFetchError(null);
            }
            break;
          case "deleteShipment":
            const ds = await deleteShipment(payload);
            if (isMounted) {
              setData(ds);
              setFetchError(null);
            }
            break;
          default:
            console.log("default");
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

    fetchData(payload);

    const cleanUp = () => {
      isMounted = false;
    };
    return cleanUp;
  }, [
    requesMethod,
    payload,
    getShipment,
    AllMedication,
    PatientAddress,
    ShipmentDetail,
    addShipment,
    dashboardData,
    deleteShipment,
    approvedPatientList,
    updateShipment,
  ]);

  return { data, isError, fetchError, isLoading };
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

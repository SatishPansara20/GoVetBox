import { useState, useEffect } from "react";

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
    // payload,
    // getShipment,
    // AllMedication,
    // PatientAddress,
    // ShipmentDetail,
    // addShipment,
    // dashboardData,
    // deleteShipment,
    // approvedPatientList,
    // updateShipment,
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

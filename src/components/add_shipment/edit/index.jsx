import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useUpdateShipmentMutation,
  useGetApprovedPatientListMutation,
  useGetShipmentDetailURLMutation,
} from "../../../Redux/ReduxApi";

import { useDispatch } from "react-redux";
import { toastAction } from "../../../Redux/commonSlice";

//import { useFetchData } from "../../common/appcommonfunction/Fuctions";
import EditForm from "./EditForm";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

let patientNames = [];
let medicationNames = [];

const EditShipmentUserData = () => {
  const dispatch = useDispatch();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();
  const [updateShipment] = useUpdateShipmentMutation();

  const [approvedPatientList] = useGetApprovedPatientListMutation();
  const [ShipmentDetail] = useGetShipmentDetailURLMutation();

  const ref = React.createRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [apList, setAPList] = useState([]);
  const [sd, setSD] = useState({});
  const [pad, setPAD] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [am, setAM] = useState([]);
  const [date, setDate] = useState({ dDate: "", ndDate: "" });
  const [selectedpatient, setSelectedPatient] = useState(sd.patinetName);

  // ShipmentDetail
  useEffect(() => {}, []);

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

    const fetchData = async () => {
      setIsLoading(true);

      try {
        //NOTE:  ShipmentDetail
        await delay();
        const response = await ShipmentDetail({
          _id: id,
        });
        if (isMounted && response.status === 400) {
          alert(response.message);
        } else if (
          isMounted &&
          response.data.status === 200 &&
          response !== undefined &&
          response !== null
        ) {
          setSD(response.data.data);
          setIsLoading(false);
          setIsError(false);
          setFetchError(null);
        }

        //NOTE:  approvedPatientList

        const response_1 = await approvedPatientList({
          start: 0,
          length: 10000,
        });
        setAPList(response_1.data.data.data);
        response_1.data.data.data.map((patient) => {
          if (!patientNames.includes(patient.name)) {
            patientNames.push(patient.name);
          }
          return patientNames;
        });
      } catch (err) {
        if (isMounted) {
          setIsError(true);
          setFetchError(err.message);
          setSD([]);
        }
      } finally {
        isMounted && setIsLoading(false) && setIsError(true);
      }
    };

    fetchData();

    const cleanUp = () => {
      isMounted = false;
    };

    return cleanUp;
  }, [id, ShipmentDetail, approvedPatientList]);

  useEffect(() => {
    if (sd !== undefined && sd !== null && Object.keys(sd).length > 0) {
      setDate({
        dDate: dayjs(sd.deliveryDate).format(dateFormate),
        ndDate: dayjs(sd.nextDeliveryDate).format(dateFormate),
      });
      setSelectedPatient(sd.patientName);
    }
  }, [sd]);

  useEffect(() => {
    const getData = async (patientId) => {
      //NOTE:  All Medications

      try {
        const response = await AllMedication({
          _id: patientId,
        });
        if (response.data.data.length > 0) {
          setAM(response.data.data);
          if (response.data.data.length > 0) {
            response.data.data.map((medication) => {
              if (!medicationNames.includes(medication.name)) {
                medicationNames.push(medication.name);
              }
              return medicationNames;
            });
          }
        }
      } catch (error) {
        console.log("Error while Getting AllMedication: ", error);
      }

      // NOTE:  Patient Address
      try {
        const response = await PatientAddress({
          length: 10000,
          patientId: patientId,
          start: 0,
        });

        if (response.data.data.length > 0) {
          setPAD(response.data.data);
        }
      } catch (error) {
        console.log("Error while Getting PatientAddress : ", error);
      }
    };

    if (Object.keys(sd).length > 0) {
      getData(sd.patientId);
    }
  }, [AllMedication, PatientAddress, sd]);

  //  Get Patient Medications and Address According to the options Selected
  const getMedicationAndAddress = async (patientId) => {
    setAM([]);
    setPAD([]);
    medicationNames = [];

    //NOTE:  All Medications

    try {
      const response = await AllMedication({
        _id: patientId,
      });
      if (response.data.data.length > 0) {
        setAM(response.data.data);
        if (response.data.data.length > 0) {
          response.data.data.map((medication) => {
            if (!medicationNames.includes(medication.name)) {
              medicationNames.push(medication.name);
            }
            return medicationNames;
          });
        }
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }

    // NOTE:  Patient Address
    try {
      const response = await PatientAddress({
        length: 10000,
        patientId: patientId,
        start: 0,
      });

      if (response.data.data.length > 0) {
        setPAD(response.data.data);
      }
    } catch (error) {
      console.log("Error while Getting PatientAddress : ", error);
    }
  };

  const handleSelecteName = (value) => {
    setSelectedPatient(value);
    ref.current?.setFieldsValue({
      medicationname: "",
      patientaddress: "",
      deliveryDate: "",
      nextDeliveryDate: "",
    });
    const selectedPatientName = apList.find(
      (patient) => patient.name === value
    );
    getMedicationAndAddress(selectedPatientName._id);
  };

  const onFinish = async (values) => {
    console.log(values);
    const payload = {
      patientId: sd.patientId,
      medicationId: sd.medicationId,
      addressId: sd.addressId,
      deliveryDate: new Date(values.deliveryDate.format()).toISOString(),
      nextDeliveryDate: new Date(
        values.nextDeliveryDate.format()
      ).toISOString(),
      dosage: values.dosage,
      trackUrl: values.trackurl,
      _id: id,
    };

    try {
      const response = await updateShipment(payload);

      if (response.data.status === 200) {
        dispatch(toastAction(response.data.message));
        navigate("/addshipment");
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Shipment Add Management</h2>
        <div className="w-full">
          {/* {isLoading ? (
            <Spin className="w-full" tip="Loading data..." size="large" />
          ) : isError ? (
            <p>{fetchError}</p>
          ) : sd !== undefined &&
            sd !== null &&
            Object.keys(sd).length > 0 &&
            am.length > 0 &&
            date.dDate !== "" &&
            date.ndDate !== "" ? (
            <EditForm
              ref={ref}
              sd={sd}
              isFeching={isLoading}
              isError={isError}
              fetchError={fetchError}
              dDate={date.dDate}
              ndDate={date.ndDate}
              onFinish={onFinish}
              handleSelecteName={handleSelecteName}
              patientNames={patientNames}
              medicationNames={medicationNames}
              pad={pad}
              // setData={setData}
            />
          ) : (
            <p>No Data Found</p>
          )} */}
          <EditForm
            ref={ref}
            sd={sd}
            isFeching={isLoading}
            isError={isError}
            fetchError={fetchError}
            dDate={date.dDate}
            ndDate={date.ndDate}
            onFinish={onFinish}
            handleSelecteName={handleSelecteName}
            patientNames={patientNames}
            medicationNames={medicationNames}
            pad={pad}
            selectedpatient={selectedpatient}
            // setData={setData}
          />
        </div>
        {/* {editForm} */}
      </div>
    </>
  );
};

export default EditShipmentUserData;

// if (isLoading) {
//   editForm = <Spin className="w-full" tip="Loading data..." size="large" />;
// } else if (isError) {
//   editForm = <p>{fetchError}</p>;
// } else if (
//   sd !== undefined &&
//   sd !== null &&
//   Object.keys(sd).length > 0 &&
//   am.length > 0 &&
//   date.dDate !== "" &&
//   date.ndDate !== ""
// ) {
//   editForm = (
//     <EditForm
//       ref={ref}
//       sd={sd}
//       isFeching={isLoading}
//       isError={isError}
//       fetchError={fetchError}
//       dDate={date.dDate}
//       ndDate={date.ndDate}
//       onFinish={onFinish}
//       handleSelecteName={handleSelecteName}
//       patientNames={patientNames}
//       medicationNames={medicationNames}
//       pad={pad}
//     />
//   );
// } else {
//   editForm = <p>No Data Found</p>;
// }

// const {
//   data: response,
//   isError,
//   fetchError,
//   isLoading: isFeching,
// } = useFetchData("ShipmentDetail", {
//   _id: id,
// });

// useEffect(() => {
//   if (!isFeching && !isError && response !== undefined && response !== null) {
//     setSD(response.data.data);
//   }
// }, [response, isError, isFeching, id]);

// useEffect(() => {
//   if (sd !== undefined && sd !== null && Object.keys(sd).length > 0) {
//     setDate({
//       dDate: dayjs(sd.deliveryDate).format(dateFormate),
//       ndDate: dayjs(sd.nextDeliveryDate).format(dateFormate),
//     });
//   }
// }, [sd]);

// Approved Patient List
// const {
//   data: response_1,
//   isError: isError_1,
//   fetchError: fetchError_1,
//   isLoading: isFeching_1,
// } = useFetchData("approvedPatientList", { start: 0, length: 10000 });

// useEffect(() => {
//   if (isFeching_1) {
//   } else if (isError_1) {
//     console.log(fetchError_1);
//   } else if (
//     response_1 !== undefined &&
//     response_1 !== null &&
//     response_1.data.data.data.length > 0
//   ) {
//     setAPList(response_1.data.data.data);
//     response_1.data.data.data.map((patient) => {
//       if (!patientNames.includes(patient.name)) {
//         patientNames.push(patient.name);
//       }
//       return patientNames;
//     });
//   }
// }, [response_1, fetchError_1, isError_1, isFeching_1]);

// const setData = (data) => {
//   setSelectedPatient(data);
//   const selectedPatientName = apList.find((patient) => patient.name === data);
//   getMedicationAndAddress(selectedPatientName._id);
// };

// useEffect(() => {
//   console.log(selectedpatient);
//   if (selectedpatient !== undefined && selectedpatient !== null) {
//     const selectedPatientName = apList.find(
//       (patient) => patient.name === selectedpatient
//     );

//     const getMedicationAndAddress = async (patientId) => {
//       setAM([]);
//       setPAD([]);
//       medicationNames = [];

//       //NOTE:  All Medications

//       try {
//         const response = await AllMedication({
//           _id: patientId,
//         });
//         if (response.data.data.length > 0) {
//           setAM(response.data.data);
//           if (response.data.data.length > 0) {
//             response.data.data.map((medication) => {
//               if (!medicationNames.includes(medication.name)) {
//                 medicationNames.push(medication.name);
//               }
//               return medicationNames;
//             });
//           }
//         }
//       } catch (error) {
//         console.log("Error while Getting AllMedication: ", error);
//       }

//       // NOTE:  Patient Address
//       try {
//         const response = await PatientAddress({
//           length: 10000,
//           patientId: patientId,
//           start: 0,
//         });

//         if (response.data.data.length > 0) {
//           setPAD(response.data.data);
//         }
//       } catch (error) {
//         console.log("Error while Getting PatientAddress : ", error);
//       }
//     };
//     if (
//       selectedPatientName !== undefined &&
//       selectedPatientName !== null &&
//       Object.keys(selectedPatientName).length > 0
//     ) {
//       getMedicationAndAddress(selectedPatientName._id);
//     }
//   }
// }, [selectedpatient, apList, AllMedication, PatientAddress]);

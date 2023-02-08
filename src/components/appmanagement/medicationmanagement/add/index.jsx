import React, { useEffect, useState } from "react"; // { useRef }

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addMedication } from "../../../../Redux/MedicationManagementSlice";


import {
  getAllSize,
  allSize,
  getAllAdministrationType,
  allAdministrationType,
} from "../../../../Redux/MedicationManagementSlice";

import AddMedicationForm from "./AddMedicationForm";
import { Button } from "antd";
let administrationData = [];

const generateData = (administrationType, administrationSizes) => {
  for (let i = 0; i < administrationType?.length; i++) {
    administrationData.push({
      administrationTypeName: administrationType[i].name,
      administrationTypeNameDataSource: {
        dataSource: administrationSizes.map((sizeName, j) => {
          return {
            key: `${administrationType[i]?.name}${j}`,
            size: sizeName?.name,
            amount: 10,
            dosage: `${j}`,
            isAllow: true,
          };
        }),
      },
    });
  }

  return administrationData;
};

const AddMedication = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const allSizeResponse = useSelector(allSize);
  const allAdministrationTypeResponse = useSelector(allAdministrationType);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [administrationSizes, setAdministrationSizes] = useState([]);
  const [administrationType, setAdministrationType] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(getAllSize());
      dispatch(getAllAdministrationType());
      setIsLoading(false);
    } catch (e) {
      console.log("While Getting Size Types", e);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (
      isLoading &&
      allSizeResponse?.status !== 200 &&
      allAdministrationTypeResponse?.status !== 200
    ) {
      console.log("Loading");
    } else {
      administrationData = [];
      setAdministrationSizes(allSizeResponse?.data);
      setAdministrationType(allAdministrationTypeResponse?.data);
    }
  }, [allSizeResponse, allAdministrationTypeResponse, isLoading]);

  

  useEffect(() => {
    if (administrationSizes?.length > 0 && administrationSizes?.length > 0) {
      console.log("We have situation");
      setData(generateData(administrationType, administrationSizes));
    }
  }, [administrationSizes, administrationType, isLoading]);

  const setChanageTableData = (from_add_data) => {
    setData([]);
    console.log("We have situation 1");
    setData(from_add_data);
  };

  const handleSave = () => {
    let administrationTypes = [];

    let generateSizes = [];

    for (let i = 0; i < administrationType.length; i++) {
      generateSizes = [];
      for (let j = 0; j < administrationSizes.length; j++) {
        const reference =
          data[i].administrationTypeNameDataSource.dataSource[j];
        generateSizes.push({
          sizeId: administrationSizes[j]._id,
          amount: reference.amount,
          dosage: reference.dosage,
          isAllow: reference.isAllow,
        });
      }

      administrationTypes.push({
        administrationTypeId: administrationType[i]._id,
        sizes: generateSizes,
      });
    }

    const payload = {
      name: new Date(),
      speciesId: "6362185675d02e50f6c0127f",
      administrationTypes: administrationTypes,
    };

    try {
      setIsLoading(true);
      dispatch(addMedication(payload));
      navigate(`/medicationmanagement`, {
        state: {
          addRequestCreated: true,
        },
      });
    } catch (e) {
      console.log("While addMedication", e);
    }
  };
  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Add Medication</h2>
        {data?.length > 0 ? (
          <>
            {data?.map((item, i) => {
              return (
                <AddMedicationForm
                  key={i}
                  isLoading={isLoading}
                  administrationTypeName={item.administrationTypeName}
                  dataSource={item.administrationTypeNameDataSource?.dataSource}
                  administrationData={data}
                  setChanageTableData={setChanageTableData}
                />
              );
            })}
          </>
        ) : (
          <p>No Data Found</p>
        )}
        <Button
          id="primary"
          type="primary"
          className="bg-violet-700"
          onClick={handleSave}
        >
          save
        </Button>
      </div>
    </>
  );
};

export default AddMedication;

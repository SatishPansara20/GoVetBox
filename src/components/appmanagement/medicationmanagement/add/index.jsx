import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  addMedication,
  addMedicationInfo,
} from "../../../../Redux/MedicationManagementSlice";
import { toastAction } from "../../../../Redux/commonSlice";

import AddMedicationForm from "./AddMedicationForm";

const AddMedication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef(null);

  //const onFormLayoutChange = function (changedFields, allFields) {};

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Add Medication</h2>
        <AddMedicationForm ref={ref} onFinish={onFinish} />
      </div>
    </>
  );
};

export default AddMedication;

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSize,
  allSize,
} from "../../../../Redux/MedicationManagementSlice";

import { Form, Spin } from "antd";
import AdministrationTypeTable from "./AdministrationTypeTable";

import { SelectField, InputField } from "../../../common/FormField/index";

const ViewMedicationDetailsForm = React.forwardRef(
  ({ userData, isFeching }, ref) => {
    const dispatch = useDispatch();
    const allSizeResponse = useSelector(allSize);

    const [isLoading, setIsLoading] = useState(true);
    const [administrationSizes, setAdministrationSizes] = useState([]);

    useEffect(() => {
      try {
        setIsLoading(true);
        dispatch(getAllSize());
        setIsLoading(false);
      } catch (e) {
        console.log("While Getting Size Types", e);
      }
    }, [dispatch, setIsLoading]);

    useEffect(() => {
      if (isLoading && allSizeResponse?.status !== 200) {
        console.log("Loading");
      } else {
        setAdministrationSizes(allSizeResponse?.data);
      }
    }, [allSizeResponse, isLoading]);

    return (
      <>
        {isLoading ? (
          <Spin className="w-full" tip="Loading data..." size="large" />
        ) : userData !== undefined &&
          userData !== null &&
          Object.keys(userData).length > 0 &&
          administrationSizes !== undefined &&
          administrationSizes?.length > 0 ? (
          <>
            <Form
              ref={ref}
              style={{
                display: "inline-block",
                width: "100%",
              }}
              name="control-ref"
              layout="horizontal"
              disabled
              //  onFieldsChange={onFormLayoutChange}

              size="large"
              initialValues={{
                name: userData?.name,
                species: userData?.species.name,
              }}
            >
              {/*Medication Name And Species*/}
              <div className="grid md:grid-cols-2  gap-3">
                {/*Medication Name  */}
                <div className="flex flex-col ">
                  <InputField
                    id="name"
                    InputlabelName="Medication Name"
                    type="text"
                    size="large"
                    message="This field is required"
                    placeholder="Enter the Medication Name"
                  />
                </div>
                {/* Species*/}
                <div className="flex flex-col ">
                  <SelectField
                    id="species"
                    selectFieldLabelName="Species"
                    message="Select Species"
                  />
                </div>
              </div>
            </Form>
            <AdministrationTypeTable
              data={userData?.medicationDetail}
              administrationSizes={administrationSizes}
            />
          </>
        ) : (
          <p>No Data Found</p>
        )}
      </>
    );
  }
);

export default ViewMedicationDetailsForm;

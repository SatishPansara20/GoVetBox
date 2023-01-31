import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toastAction } from "../../../Redux/commonSlice";
import {
  getUserDetail,
  userInfo,
  updateUser,
  updateUserInfo,
} from "../../../Redux/UserManagementSlice";

import UserManagementEditForm from "./UserManagementEditForm";

const UserManagementEdit = () => {
  const dispatch = useDispatch();
  const response = useSelector(userInfo);
  const updatedData = useSelector(updateUserInfo);

  const { id } = useParams();
  const navigate = useNavigate();

  const ref = React.createRef(null);
  const formData = new FormData();

  const [userData, setUserData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setUserData({});
    dispatch(getUserDetail({ _id: id }));
    setFetchError(null);
    setIsLoading(false);
    setIsError(false);
  }, [dispatch, id]);

  useEffect(() => {
    console.log(response?.data?.firstName);
    setUserData(response?.data);
  }, [response]);

  const onFinish = async (values) => {
    formData.set("userId", id);
    formData.set("email", values.email);
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("contact", values.contact);

    try {
      dispatch(updateUser(formData));
      dispatch(toastAction(updatedData?.message));
      navigate("/usermanagement");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Edit Management</h2>
        <div className="w-full">
          <UserManagementEditForm
            ref={ref}
            userData={userData}
            isFeching={isLoading}
            isError={isError}
            fetchError={fetchError}
            onFinish={onFinish}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagementEdit;

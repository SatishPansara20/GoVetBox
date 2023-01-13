// Approved Patient List

const ApprovedPatientData = {
  _id: "63ad345ea2d589434a21d990",
  name: "Mask",
  ownerName: "Rohan Makwana",
  ownerEmail: "rohanm31@yopmail.com",
  image: "Mask_X19WU.jpg",
  dob: "2017-12-01T00:00:00Z",
  weight: "26",
  gender: "Male",
  type: "Neutered",
  isSubscribed: true,
  isMixBreed: "Yes",
  breedName: "German Shepherd",
  isAdminApproved: 1,
  createdAt: "2022-12-29T06:31:58.726Z",
};

// getShipmentDetailURL

const getShipmentDetail = {
  _id: "63c1404eb3ecf274fc708ffe",
  patientId: "63ad345ea2d589434a21d990",
  addressId: "636c94b18de6475519907661",
  medicationId: "63846d2d673b9e3583c17a13",
  deliveryDate: "2022-02-17T11:24:47Z",
  nextDeliveryDate: "2023-01-13T11:28:00Z",
  trackUrl: "test.abc.com",
  dosage: "2",
  patinetName: "Mask",
  medicationName: "Meta 01",
  addressLine1: "test",
  addressLine2: "address",
};

const updateData = {
  updatedAt: "2023-01-13T12:59:08.995Z",
  createdAt: "2023-01-13T11:28:14.117Z",
  _id: "63c1404eb3ecf274fc708ffe",
  deliveryDate: "2022-02-17T11:24:47Z",
  nextDeliveryDate: "2023-01-13T11:28:00Z",
  trackUrl: "test.abc.com",
  dosage: "2",
  patientId: "63ad345ea2d589434a21d990",
  addressId: "636c94b18de6475519907661",
  medicationId: "63846d2d673b9e3583c17a13",
};

// get Patient Address

const getPatientAddress = [
  {
    _id: "636c94b18de6475519907661",
    addressLine1: "test",
    addressLine2: "address",
    city: "Ahmedabad ",
    state: "Delaware",
    pincode: "12345",
    isDefault: true,
    userId: "636c940f8de6475519907660",
  },
];

// get All Medications
const getAllMedications = [
  { amount: 25, name: "Meta 01", medicationId: "63846d2d673b9e3583c17a13" },
];

//Add Shipment

const addShipment = [
  {
    addressId: "636c94b18de6475519907661",
    deliveryDate: "2023-01-14T13:16:26Z",
    dosage: "2",
    medicationId: "63846d2d673b9e3583c17a13",
    nextDeliveryDate: "2023-01-19T13:16:36Z",
    patientId: "63ad345ea2d589434a21d990",
    trackUrl: "test.abc.com",
  },
];

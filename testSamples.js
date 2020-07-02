const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhZTBlNzkzLTdjZmItNGNkMS1hYjZkLTNmZTA4ODY5NzRkYSIsImVtYWlsIjoiYWRtaW5AZGV2LmNvbSIsInJvbGUiOiJBRE1JTiIsInR5cGUiOm51bGwsImlhdCI6MTU5MzY3OTQ2OH0.HiozkET8znDlmYfYImWj5fGu2CDcBvE1n_26FqVHa34";

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ODRjY2ZhLTc5MjEtNDBjNy1iOWRiLTk5YzhhOTRmZGI4NyIsImVtYWlsIjoidXNlckBkZXYuY29tIiwicm9sZSI6IlVTRVIiLCJ0eXBlIjpudWxsLCJpYXQiOjE1OTM2ODMxMjZ9.qr94fJiEAQ3DpZw2xItV4QH6YAYLo5Zi7Yv2VAg9WUU";

const adminSample = {
  lastName: "admin",
  firstName: "admin",
  email: "admin@dev.com",
  password: "admin",
  localisation: "admin",
  phone_number: 0656565656,
  phone_number2 :null,
  schoolName:"",
  companyName:"",
  siret:"",
  qualification:"",
  mobility:"",
  name_organisation:"",
  isActive: false,
  logo:"",
  ActivityFieldId: "",
  UserTypeId: "",
};

const userSample = {
  lastName: "user",
  firstName: "user",
  email: "user@dev.com",
  password: "user",
  localisation: "user",
  phone_number: 0656565656,
  phone_number2 :null,
  schoolName:"",
  companyName:"",
  siret:"",
  qualification:"",
  mobility:"",
  name_organisation:"",
  isActive: false,
  logo:"",
};

module.exports = {
  adminToken,
  userToken,
  adminSample,
  userSample,
};

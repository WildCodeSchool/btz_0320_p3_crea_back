const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNTkwMGVhLTE4NDYtNDhlYS1iZTA4LWE0NTEyZTllZTgxZCIsImVtYWlsIjoiYWRtaW5AZGV2LmNvbSIsInJvbGUiOiJBRE1JTiIsInR5cGUiOm51bGwsImlhdCI6MTU5NDAxOTYwMywiZXhwIjoxNTk0MTA2MDAzfQ.uKfANDJLATUg6Z-xKu9ScUA6akrobpqylUaPvxQYMJw";

  const userToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1ZGQ0M2VmLWQxM2ItNGZiYS1iM2IyLTBlYjJlZWQ3N2E0YyIsImVtYWlsIjoidXNlckBkZXYuY29tIiwicm9sZSI6IlVTRVIiLCJ0eXBlIjpudWxsLCJpYXQiOjE1OTQwMTk2MzMsImV4cCI6MTU5NDEwNjAzM30.V8nzWUvM8uF2PP5TTs8lhA1xqg7UGEuGXWoS3reiRNk"
const adminSample = {
  lastName: "admin",
  firstName: "admin",
  email: "admin@dev.com",
  password: "admin",
  localisation: "admin",
  country: "France",
  phone_number: 0656565656,
  phone_number2: null,
  schoolName: "",
  companyName: "",
  siret: "",
  qualification: "",
  mobility: "",
  name_organisation: "",
  isActive: false,
  logo: "",
  ActivityFieldId: "",
  UserTypeId: "",
};

const userSample = {
  lastName: "user",
  firstName: "user",
  email: "user@dev.com",
  password: "user",
  localisation: "user",
  country: "France",
  phone_number: 0656565656,
  phone_number2: null,
  schoolName: "",
  companyName: "",
  siret: "",
  qualification: "",
  mobility: "",
  name_organisation: "",
  isActive: false,
  logo: "",
};

module.exports = {
  adminToken,
  userToken,
  adminSample,
  userSample,
};

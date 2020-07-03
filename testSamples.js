const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjNTIyZTJlLTM4ODQtNGU4Ny1hN2QzLTc4ZmVjOWY1MzJkZiIsImVtYWlsIjoiYWRtaW5AZGV2LmNvbSIsInJvbGUiOiJBRE1JTiIsInR5cGUiOm51bGwsImlhdCI6MTU5Mzc2NDU5MSwiZXhwIjoxNTkzODUwOTkxfQ.RjZAiICm3DeK29k9yxzW_ahOgeuObtqZzYFF6w0lR9Q";

const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjQxZWFkLTFjYmYtNDU4Ny1hNWJiLTdkNWMwM2E1ZjU2MiIsImVtYWlsIjoidXNlckBkZXYuY29tIiwicm9sZSI6IlVTRVIiLCJ0eXBlIjpudWxsLCJpYXQiOjE1OTM3NjQ2NTAsImV4cCI6MTU5Mzg1MTA1MH0.I4cOESdQd-cqSPciB0KTGk-H6HkMqRk-iRga7HA_J_o";

const adminSample = {
    lastName: "admin",
    firstName: "admin",
    email: "admin@dev.com",
    password: "admin",
    localisation: "admin",
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

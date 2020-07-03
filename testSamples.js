const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDBlNzQzLTAzNmEtNDBjZi04YzQwLTgyZDExYjM3MGFjMSIsImVtYWlsIjoiYWRtaW5AZGV2LmNvbSIsInJvbGUiOiJBRE1JTiIsInR5cGUiOm51bGwsImlhdCI6MTU5Mzc3NjM3MiwiZXhwIjoxNTkzODYyNzcyfQ.slBA8eG9wGLI0ZJRwtcNVRBTDyFRn1kmEq60zNJMXPs";

const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MzhkOGI5LTFjMTEtNDBiNS04YzgxLTI1YjUyNGI1MDM2MSIsImVtYWlsIjoidXNlckBkZXYuY29tIiwicm9sZSI6IlVTRVIiLCJ0eXBlIjpudWxsLCJpYXQiOjE1OTM3NzY0MDEsImV4cCI6MTU5Mzg2MjgwMX0.ug-RlHmqDxSEOqFJgeVsrYnorAiKkJWfyhnFluyExnc";

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

const User = require("../models/User");

(async () => {
  await User.create({
    lastName: "toto",
    firstName: "jean",
    email: "hello",
    password: "hellohe",
    localisation: "vielle",
    phone_number: 556325365,
    phone_number2: 558547854,
    isAdmin: true,
    schoolName: "wcs",
    companyName: "wcs",
    siret: "211680374",
    qualification: "job",
    mobility: "france",
    name_organisation: "wcs",
    isActive: false,
    logo: "bjisdckjs",
  });
})(); // permet d'exécuter cette fonction sans avoir à l'appeller

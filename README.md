## VARIABLE ENVIRONMENT FOR DATABASE

_please create a ".env" with those fields for using the database_

- DBNAME="(name of database)"
- DBUSER= (your user name for database)
- DBPASS="(password to access database)"
- DBDIALECT="(dialect for database language ex: sql)"
- DBHOST="(host server for database)"
- SECRET=" a random set of unique character for security(SALT)"

## MODULES to INSTALL from package.json with npm install:

    "@hapi/joi"(schema description language and data validator for JavaScript. Used in validor.js to fix a failed test)

    "bcrypt"(a password-hashing function with a salt)

    "body-parser"(body-parser extract the entire body portion of an incoming request stream and exposes it on req.body )

    "chai"(BDD / TDD assertion library)

    "chai-http"(addon plugin for the Chai Assertion Library)

    "cors" (allow front-end to communicate with back-end)

    "dotenv"( module that loads environment variables from a .env file into process.env to made password secret)

    "express"(a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications)

    "generate-password" (generate random password automatically)

    "jsonwebtoken"(allows you to decode, verify and generate tokens with Json format)

    "mysql"(open-source relational database management system)

    "mysql2"( A modern, simple and very fast MySQL library with additionnal features)

    "nodemon"(a utility that will monitor for any changes in your source and automatically restart your server)

    "pg"()

    "pg-hstore"(A node package for serializing and deserializing JSON data to hstore format)

    "sequelize"(ORM for MySQL)

## Ressource list/pagination

_Before using the api, you need to generate a token with your account :_
URL_API : http://api.networking.crea-aquitaine.org/api/v1

### Auth Admin

POST URL_API/auth/login
Content-Type: application/json

{
"email" : "admin@dev.com",
"password" : "admin"
}

_Data example :_

```json (object)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNhZjczMjBhLTViMjEtNDE4Ni1hZjdkLTc2NTc4Y2JlZjEyMCIsImVtYWlsIjoiYWRtaW5AZGV2LmNvbSIsInJvbGUiOiJBRE1JTiIsInR5cGUiOm51bGwsImlhdCI6MTU5NTgzNjQ3OSwiZXhwIjoxNTk1OTIyODc5fQ.GOJm2waNxTAhkLjPHnanq3IZoAS9UANjQAM76kJO8lg",
  "user": {
    "id": "3af7320a-5b21-4186-af7d-76578cbef120",
    "lastName": "admin",
    "firstName": "admin",
    "email": "admin@dev.com",
    "localisation": "admin",
    "country": "France",
    "phone_number": 112913326,
    "phone_number2": null,
    "schoolName": null,
    "companyName": null,
    "siret": null,
    "qualification": null,
    "mobility": null,
    "name_organisation": null,
    "isActive": null,
    "logo": null,
    "createdAt": "2020-07-16T12:38:56.000Z",
    "updatedAt": "2020-07-16T12:38:56.000Z",
    "ActivityFieldId": null,
    "UserTypeId": null,
    "RoleId": "e817fbc5-7ff0-4005-abec-c900980ee02f",
    "Role": {
      "label": "ADMIN"
    },
    "UserType": null
  }
}
```

### User route

##### Get all users

GET URL_API/users
Authorization : Bearer token

_data example_

```json (array)
[
  {
    "id": "0d5d2399-b231-40eb-ade8-9b65d7f3d1c2",
    "lastName": "Moulon",
    "firstName": "Marylou",
    "email": "marylou@wcs.com",
    "password": "$2b$10$DRV594oCwEuyVOjCOdZxeuhtn.4hZD30zin9a6wvS3GgWhSzd895a",
    "localisation": "Biarritz",
    "country": "Espagne",
    "phone_number": 102030405,
    "phone_number2": 102030405,
    "schoolName": "Wild Code School",
    "companyName": null,
    "siret": null,
    "qualification": "Campus Manager",
    "mobility": null,
    "name_organisation": null,
    "isActive": null,
    "logo": null,
    "createdAt": "2020-07-17T11:51:43.000Z",
    "updatedAt": "2020-07-17T11:51:43.000Z",
    "ActivityFieldId": "00d34fe6-0a1c-4a49-91cb-ee12b6595cbf",
    "UserTypeId": "230028a1-7e6b-4c5e-b6b9-94d37cc794dc",
    "RoleId": "e6df19a7-fbae-48bf-bc58-759bfb46e6e4",
    "UserType": {
      "id": "230028a1-7e6b-4c5e-b6b9-94d37cc794dc",
      "label": "Ecole",
      "createdAt": "2020-07-17T08:52:05.000Z",
      "updatedAt": "2020-07-17T08:52:05.000Z"
    },
    "ActivityField": {
      "id": "00d34fe6-0a1c-4a49-91cb-ee12b6595cbf",
      "labelFr": "tourisme",
      "labelEs": "tourisma",
      "labelEus": "tourismota",
      "createdAt": "2020-07-17T08:22:13.000Z",
      "updatedAt": "2020-07-17T08:22:13.000Z"
    },
    "Role": {
      "id": "e6df19a7-fbae-48bf-bc58-759bfb46e6e4",
      "label": "USER",
      "createdAt": "2020-07-16T08:34:18.000Z",
      "updatedAt": "2020-07-16T08:34:18.000Z"
    }
  }
]
```

##### Get one user

GET URL_API/users/{id}
Authorization : Bearer token

```json (object)
{
  "id": "0d5d2399-b231-40eb-ade8-9b65d7f3d1c2",
  "lastName": "Moulon",
  "firstName": "Marylou",
  "email": "marylou@wcs.com",
  "password": "$2b$10$DRV594oCwEuyVOjCOdZxeuhtn.4hZD30zin9a6wvS3GgWhSzd895a",
  "localisation": "Biarritz",
  "country": "Espagne",
  "phone_number": 102030405,
  "phone_number2": 102030405,
  "schoolName": "Wild Code School",
  "companyName": null,
  "siret": null,
  "qualification": "Campus Manager",
  "mobility": null,
  "name_organisation": null,
  "isActive": null,
  "logo": null,
  "createdAt": "2020-07-17T11:51:43.000Z",
  "updatedAt": "2020-07-17T11:51:43.000Z",
  "ActivityFieldId": "00d34fe6-0a1c-4a49-91cb-ee12b6595cbf",
  "UserTypeId": "230028a1-7e6b-4c5e-b6b9-94d37cc794dc",
  "RoleId": "e6df19a7-fbae-48bf-bc58-759bfb46e6e4"
}
```

##### Put one user

GET URL_API/users/{id}
Authorization : Bearer token

```json (object)
{
  "id": "0d5d2399-b231-40eb-ade8-9b65d7f3d1c2",
  "lastName": "Moulon",
  "firstName": "Marylou",
  "email": "helloworldtest@put.com",
  "password": "$2b$10$DRV594oCwEuyVOjCOdZxeuhtn.4hZD30zin9a6wvS3GgWhSzd895a",
  "localisation": "Biarritz",
  "country": "Espagne",
  "phone_number": 102030405,
  "phone_number2": 102030405,
  "schoolName": "Wild Code School",
  "companyName": null,
  "siret": null,
  "qualification": "Campus Manager",
  "mobility": null,
  "name_organisation": null,
  "isActive": null,
  "logo": null,
  "createdAt": "2020-07-17T11:51:43.000Z",
  "updatedAt": "2020-07-27T08:26:46.000Z",
  "ActivityFieldId": "00d34fe6-0a1c-4a49-91cb-ee12b6595cbf",
  "UserTypeId": "230028a1-7e6b-4c5e-b6b9-94d37cc794dc",
  "RoleId": "e6df19a7-fbae-48bf-bc58-759bfb46e6e4"
}
```

##### Delete one user

GET URL_API/users/{id}
Authorization : Bearer token

```json (object)
{
  "message": "User is deleted."
}
```

##### Get all post of one user

_For all other routes, you need to get a token and one user Id_

GET URL_API/users/{user_id}/posts
Authorization : Bearer token

```json (array)
[
  {
    "id": "5bf6f463-10fb-41ed-b9ff-1f7fb847f8c0",
    "title": "Recherche doublure cascade",
    "content": "<p>Pour un prochain long métrage produit par « MACASSAR « , nous recherchons pour un tournage sur Paris cet été&nbsp; :</p><p>&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 doublure , jeune fille sautant dans l’eau :</p><p>20- 30 ans Cheveux blonds mi longs (épaules ) 1m67 / confection&nbsp; Taille 36</p><p>Tournage entre le 7 et le 17 août / PARiS</p>",
    "localisation": "Hendaye",
    "language": "Euskal",
    "createdAt": "2020-07-17T11:56:00.000Z",
    "updatedAt": "2020-07-17T11:56:00.000Z",
    "UserId": "445ee66c-b868-46e2-8154-f0e40a0a43dd",
    "TypePostId": "eea023f0-3ea7-41e0-abbc-3e0dc13d4a93",
    "JobCategoryId": "0df21cb0-ccd8-4856-b201-8092979fabbe"
  }
]
```

# CREA NETWORKING

<img src="https://i.ibb.co/mDFSXNG/logo-crea-2015.jpg" alt="Crea" width="15%"> </img>

## ABOUT THE PROJECT

Crea is a cross-border networking platform.

## PREREQUISITES

​Node > 12.18.3

## GETTING STARTED

```bash
git clone # clone the project
npm install # Install all dependencies
Create environment variables
npm run dev # Runs the dev environment
npm start # Runs the prod environment
npm test # Runs mocha
```

### Variable environment for database

_please create a `.env` with those fields for using the database_

```bash
- DBNAME="(name of database)"
- DBUSER= (your user name for database)
- DBPASS="(password to access database)"
- DBDIALECT="(Sequelize is independent from specific dialects. This means that you'll have to install the respective connector library to your project yourself.)"
- DBHOST="(host server for database)"
- SECRET=" a random set of unique character for security(SALT)"
```

- Databases should be created by hand before (https://www.npmjs.com/package/dotenv)

### Our stack

- Express
- Node Js
- Sequelize

### Architecture

```bash
├── api
  └── v1 # Version 1
    └── routes # Api's routes
├── middleware # All of the middlewares
├── models # Models's tables
├── test # Test for each route
└── webSockets # Websocket management
```

## TEST

They are produced with Chai and Mocha.

## RESSOURCE LIST/PAGINATION

_Before using the api, you need to generate a token with your account :_
URL_API : http://localhost:port/api/v1

### Summary

1. [Auth route](#auth_route)
  * [Login](#login)
  * [Register](#register)
  * [Forget Password](#forget_pass)

2. [User route](#user_route)
  * [Get all Users](#get_all_users)
  * [Get one User](#get_one_user)
  * [Put one User](#put_one_user)
  * [Delete one User](#delete_one_user)
  * [Get all posts for one user](#get_all_posts_for_one)

3. [Posts route](#posts_route)
  * [Get all posts](#get_all_posts)
  * [Get one post](#get_one_post)
  * [Post one post](#post_one_post)
  * [Put one post](#put_one_post)
  * [delete_one_post](#delete_one_post)

4. [PostTypes route](#postTypes_route)
  * [Get all types posts ](#get_all_postTypes)
  * [Get one type posts](#get_one_postTypes)
  * [Post one type posts](#post_one_postTypes)
  * [Put one type posts](#put_one_postTypes)
  * [Delete one type posts](#delete_one_postTypes)

5. [Job Categories route](#jobCategory_route)
  * [Get all of job categories](#get_all_jobCategories)
  * [Get one job categories](#get_one_jobCategories)
  * [Post one job categories](#post_one_jobCategories)
  * [Put one job categories](#put_one_jobCategories)
  * [Delete one job categories](#delete_one_jobCategories)

6. [User Types route](#userTypes_route)
  * [Get all users types](#get_all_userTypes)
  * [Get one users type](#get_one_userTypes)
  * [Get all users of one user type](#get_all_users_userTypes)
  * [Post one users type](#post_one_userTypes)
  * [Put one user type](#put_one_userTypes)
  * [Delete one user type](#delete_one_userType)

7. [Roles route](#role_route)
  * [Get all roles](#get_all_roles)

8. [FAQ route](#faq_route)
  * [Get all of the questions/answers](#get_all_faq)
  * [Get one question/answer](#get_one_faq)
  * [Post one question/answer](#post_one_faq)
  * [Put one question/answer](#put_one_faq)
  * [Delete a question/answer](#delete_one_faq)

9. [Partners route](#partners_route)
  * [Get all partners](#get_all_partners)
  * [Get one partner](#get_one_partner)
  * [Post one partners](#post_one_partner)
  * [Put one partners](#put_one_partner)
  * [Delete one partners](#delete_one_partner)

10. [Replies route](#replies_route)
  * [Get all replies](#get_all_replies)
  * [Get one reply](#get_one_reply)
  * [Post one reply](#post_one_reply)
  * [Delete one reply](#delete_one_reply)

11. [Mail route](#mail_route)
  * [Post a mail](#post_mail)

### <a name="auth_route" >Auth route </a>
##### <a name="login"> Login </a>

POST URL_API/auth/login
Content-Type: application/json

```json (object)
{
  "email": "admin@dev.com",
  "password": "admin"
}
```

_Result example :_

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

##### <a name="register"> Register </a>

POST URL_API/auth/register
Content-Type: application/json

```json (object)
{
  "lastName": "Dertone",
  "firstName": "Paul",
  "email": "p.dertone@gmail.com",
  "password": "toto",
  "localisation": "vielle",
  "country": "Espagne",
  "phone_number": "0656565656",
  "phone_number2": "558547854",
  "schoolName": "wcs",
  "companyName": "wcs",
  "siret": "211680374",
  "qualification": "job",
  "mobility": "Espagne",
  "name_organisation": "wcs",
  "isActive": false,
  "logo": "bjisdckjs",
  "RoleId": "08fdaa1c-00d8-422e-8df9-c665923e9a1e",
  "UserTypeId": "2322abe1-f6e3-41af-b23a-7a2a44c48539"
}
```

_Result example :_

```json (object)
{
  "id": "c27cf11f-f246-474e-9586-0425067c3077",
  "lastName": "Dertone",
  "firstName": "Paul",
  "email": "p.dertone@gmail.com",
  "password": "$2b$10$B4iK8aJghVX0QQHlkrvsx.D3S.URe1Z/wy4euOVU7.P8zlGs66..a",
  "localisation": "vielle",
  "country": "Espagne",
  "phone_number": "0656565656",
  "phone_number2": "558547854",
  "schoolName": "wcs",
  "companyName": "wcs",
  "siret": "211680374",
  "qualification": "job",
  "mobility": "Espagne",
  "name_organisation": "wcs",
  "isActive": false,
  "logo": "bjisdckjs",
  "UserTypeId": "2322abe1-f6e3-41af-b23a-7a2a44c48539",
  "RoleId": "08fdaa1c-00d8-422e-8df9-c665923e9a1e",
  "updatedAt": "2020-07-27T12:14:07.563Z",
  "createdAt": "2020-07-27T12:14:07.563Z"
}
```

##### <a name="forget_pass"> Forgot password </a>

POST URL_API/auth/forgetPassword
Content-Type: application/json

```json (object)
{
  "email": "toto@dev.com"
}
```

_Result example_

```json (object)
{
  "mail": true
}
```

### <a name="user_route"> Users route </a>

##### <a name="get_all_users"> Get all users (accessible as admin) </a>

GET URL_API/users
Authorization : Bearer token

_Result example_

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

##### <a name="get_one_user"> Get one user (accessible as admin or user) </a>

GET URL_API/users/{id}
Authorization : Bearer token

_Result example_

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

##### <a name="put_one_use"> Put one user (accessible as admin or user) </a>

PUT URL_API/users/{id}
Authorization : Bearer token

```json (object)
{
  "lastName": "Moulonn"
}
```

_Result example_

```json (object)
{
  "id": "0d5d2399-b231-40eb-ade8-9b65d7f3d1c2",
  "lastName": "Moulonn",
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

##### <a name="delete_one_user"> Delete one user (accessible as admin or user) </a>

DELETE URL_API/users/{id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "message": "User is deleted."
}
```

##### <a name="get_all_posts_for_one"> Get all post of one user (accessible as admin or user) </a>

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

### <a name="posts_route"> Posts route </a>

##### <a name="get_all_posts">Get all of the posts (accessible as admin or user) </a>

GET URL_API/posts/
Authorization : Bearer token

_Result example_

```json (array)
[
  {
    "id": "2dc9034a-9697-48ad-8f1e-ded51206c138",
    "title": "recherche secretaire",
    "content": "annonce1",
    "localisation": "bayonne",
    "language": "Euskal",
    "createdAt": "2020-07-27T09:03:58.000Z",
    "updatedAt": "2020-07-27T09:03:58.000Z",
    "UserId": "013eb59f-644f-4628-96ac-1945dbb0a757",
    "TypePostId": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "JobCategoryId": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
    "TypePost": {
      "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
      "labelFr": "offre d'emploi",
      "labelEs": "offre d'emploi",
      "labelEus": "offre d'emploi",
      "createdAt": "2020-07-20T14:23:38.000Z",
      "updatedAt": "2020-07-20T14:23:38.000Z"
    },
    "JobCategory": {
      "id": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
      "labelFr": "informatique",
      "labelEs": "informatique",
      "labelEus": "informatique",
      "createdAt": "2020-07-20T14:24:19.000Z",
      "updatedAt": "2020-07-20T14:24:19.000Z"
    }
  }
]
```

##### <a name="get_one_post"> Get one post (accessible as admin or user) </a>

GET URL_API/posts/{post_id}
Authorization : Bearer token

_Result example_

```json (array)
[
  {
    "id": "2dc9034a-9697-48ad-8f1e-ded51206c138",
    "title": "recherche secretaire",
    "content": "annonce 1",
    "localisation": "bayonne",
    "language": "Euskal",
    "createdAt": "2020-07-27T09:03:58.000Z",
    "updatedAt": "2020-07-27T09:03:58.000Z",
    "UserId": "013eb59f-644f-4628-96ac-1945dbb0a757",
    "TypePostId": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "JobCategoryId": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
    "JobCategory": {
      "id": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
      "labelFr": "informatique",
      "labelEs": "informatique",
      "labelEus": "informatique",
      "createdAt": "2020-07-20T14:24:19.000Z",
      "updatedAt": "2020-07-20T14:24:19.000Z"
    },
    "TypePost": {
      "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
      "labelFr": "offre d'emploi",
      "labelEs": "offre d'emploi",
      "labelEus": "offre d'emploi",
      "createdAt": "2020-07-20T14:23:38.000Z",
      "updatedAt": "2020-07-20T14:23:38.000Z"
    }
  }
]
```

##### <a name="post_one_post"> Post one post (accessible as admin or user) </a>

POST URL_API/posts/
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "id": "0a22f629-5e53-4d42-8550-c5d5b68fe24a",
  "title": "annonce5",
  "content": "blablabla54",
  "localisation": "biarritz",
  "language": "french",
  "UserId": "a7acd991-b6db-4c50-9408-22a03dae7c04",
  "TypePostId": "06408166-2535-46e5-84ad-6a9ea310dfae",
  "JobCategoryId": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2"
}
```

_Result example_

```json (object)
{
  "id": "0a22f629-5e53-4d42-8550-c5d5b68fe24a",
  "title": "annonce5",
  "content": "blablabla54",
  "localisation": "biarritz",
  "language": "french",
  "UserId": "a7acd991-b6db-4c50-9408-22a03dae7c04",
  "TypePostId": "06408166-2535-46e5-84ad-6a9ea310dfae",
  "JobCategoryId": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
  "updatedAt": "2020-07-27T09:14:36.315Z",
  "createdAt": "2020-07-27T09:14:36.315Z"
}
```

##### <a name="put_one_post"> Put one post (accessible as admin or user) </a>

PUT URL_API/posts/{post_id}
Authorization : Bearer token

```json (object)
{
  "title": "annoncePut"
}
```

_Result example_

```json (object)
{
  "id": "0a22f629-5e53-4d42-8550-c5d5b68fe24a",
  "title": "annoncePut",
  "content": "blablabla54",
  "localisation": "biarritz",
  "language": "french",
  "createdAt": "2020-07-27T09:14:36.000Z",
  "updatedAt": "2020-07-27T09:17:45.000Z",
  "UserId": "a7acd991-b6db-4c50-9408-22a03dae7c04",
  "TypePostId": "06408166-2535-46e5-84ad-6a9ea310dfae",
  "JobCategoryId": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2"
}
```

##### <a name="delete_one_post"> Delete one post (accessible as admin or user) </a>

PUT URL_API/posts/{post_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "message": "Post is deleted."
}
```

### <a name="postTypes_route" > PostTypes route </a>

##### <a name="get_all_postTypes"> Get all the post types (accessible as admin or user) </a>

GET URL_API/postTypes
Authorization : Bearer token

_Result example_

```json (object)
[
  {
    "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "labelFr": "offre d'emploi",
    "labelEs": "offre d'emploi",
    "labelEus": "offre d'emploi",
    "createdAt": "2020-07-20T14:23:38.000Z",
    "updatedAt": "2020-07-20T14:23:38.000Z"
  },
  {
    "id": "064e9658-4b36-4a2a-957b-6e3d3392106e",
    "labelFr": "R&D",
    "labelEs": "R&D",
    "labelEus": "R&D",
    "createdAt": "2020-07-20T14:23:29.000Z",
    "updatedAt": "2020-07-20T14:23:29.000Z"
  }
]
```

##### <a name="get_one_postTypes" > Get one post type (accessible as admin or user) </a>

GET URL_API/postTypes/{postType_id}
Authorization : Bearer token

_Result example_

```json (object)
[
  {
    "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "labelFr": "offre d'emploi",
    "labelEs": "offre d'emploi",
    "labelEus": "offre d'emploi",
    "createdAt": "2020-07-20T14:23:38.000Z",
    "updatedAt": "2020-07-20T14:23:38.000Z"
  }
]
```

##### <a name="post_one_postTypes" > Post one post type (accessible as admin) </a>

POST URL_API/postTypes/
Authorization : Bearer token

```json (object)
{
  "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
  "labelFr": "offre d'emploi",
  "labelEs": "offre d'emploi",
  "labelEus": "offre d'emploi"
}
```

_Result example_

```json (object)
[
  {
    "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "labelFr": "offre d'emploi",
    "labelEs": "offre d'emploi",
    "labelEus": "offre d'emploi",
    "createdAt": "2020-07-20T14:23:38.000Z",
    "updatedAt": "2020-07-20T14:23:38.000Z"
  }
]
```

##### <a name="put_one_postTypes"> Put one post type (accessible as admin) </a>

PUT URL_API/postTypes/
Authorization : Bearer token

```json (object)
{
  "labelFr": "offre d'emploi fr"
}
```

_Result example_

```json (object)
[
  {
    "id": "06408166-2535-46e5-84ad-6a9ea310dfae",
    "labelFr": "offre d'emploi fr",
    "labelEs": "offre d'emploi",
    "labelEus": "offre d'emploi",
    "createdAt": "2020-07-20T14:23:38.000Z",
    "updatedAt": "2020-07-20T14:23:38.000Z"
  }
]
```

##### <a name="delete_one_postTypes">Delete one post type (accessible as admin )</a>

DELETE URL_API/postTypes/
Authorization : Bearer token

```json (object)
{
  "labelFr": "offre d'emploi fr"
}
```

_Result example_

```json (object)
{
  "message": "PostType is deleted."
}
```

### <a name="jobCategory_route"> Job Categories route </a>

##### <a name="get_all_jobCategories">Get all of the job categories (accessible as admin or user) </a>

GET URL_API/jobCategories/
Authorization : Bearer token

_Result example_

```json (array)
[
  {
    "id": "06b64684-4d9c-4a61-ac3c-6c1126cd2da2",
    "labelFr": "informatique",
    "labelEs": "informatique",
    "labelEus": "informatique",
    "createdAt": "2020-07-20T14:24:19.000Z",
    "updatedAt": "2020-07-20T14:24:19.000Z"
  },
  {
    "id": "f283d337-ae2c-4216-b466-38e444c7f7b4",
    "labelFr": "comptabilité",
    "labelEs": "comptabilité",
    "labelEus": "comptabilité",
    "createdAt": "2020-07-20T14:24:10.000Z",
    "updatedAt": "2020-07-20T14:24:10.000Z"
  }
]
```

##### <a name="get_one_jobCategories"> Get one job category (accessible as admin or user) </a>

GET URL_API/jobCategories/{jobCategory_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "id": "f283d337-ae2c-4216-b466-38e444c7f7b4",
  "labelFr": "comptabilité",
  "labelEs": "comptabilité",
  "labelEus": "comptabilité",
  "createdAt": "2020-07-20T14:24:10.000Z",
  "updatedAt": "2020-07-20T14:24:10.000Z"
}
```

##### <a name="post_one_jobCategories" >Post one job category (accessible as admin)</a>

POST URL_API/jobCategories/{jobCategory_id}
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "labelFr": "Informatique",
  "labelEs": "Informatique",
  "labelEus": "Informatique"
}
```

_Result example_

```json (object)
{
  "id": "89e70dd0-1210-4878-aed8-53e9616b6624",
  "labelFr": "Informatique",
  "labelEs": "Informatique",
  "labelEus": "Informatique",
  "updatedAt": "2020-07-27T09:47:44.478Z",
  "createdAt": "2020-07-27T09:47:44.478Z"
}
```

##### <a name="put_one_jobCategories"> Put one job category (accessible as admin) </a>

PUT URL_API/jobCategories/{jobCategory_id}
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "labelEs": "Informatico"
}
```

_Result example_

```json (object)
{
  "id": "89e70dd0-1210-4878-aed8-53e9616b6624",
  "labelFr": "Informatique",
  "labelEs": "Informatico",
  "labelEus": "Informatique",
  "updatedAt": "2020-07-27T09:47:44.478Z",
  "createdAt": "2020-07-27T09:47:44.478Z"
}
```

##### <a name="delete_one_jobCategories">Delete one job category (accessible as admin)</a>

DELETE URL_API/jobCategories/{jobCategory_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "message": "Job category is deleted."
}
```

### <a name="userTypes_route">User Types route</a>

##### <a name="get_all_userTypes">Get all of the user types (accessible as all)</a>

GET URL_API/userTypes/

_Result example_

```json (array)
[
  {
    "id": "39e24a57-d2cd-4e42-948c-ca842de2c1f2",
    "label": "Demandeur emploi",
    "createdAt": "2020-07-20T14:13:51.000Z",
    "updatedAt": "2020-07-20T14:13:51.000Z"
  },
  {
    "id": "84a88879-297b-47ec-8564-5b15186a982f",
    "label": "Entreprise",
    "createdAt": "2020-07-20T14:13:51.000Z",
    "updatedAt": "2020-07-20T14:13:51.000Z"
  },
  {
    "id": "fb01ca40-5585-4c66-8a97-8be2b8d953e8",
    "label": "Ecole",
    "createdAt": "2020-07-20T14:13:51.000Z",
    "updatedAt": "2020-07-20T14:13:51.000Z"
  }
]
```

##### <a name="get_one_userTypes"> Get one user type (accessible as admin or user) </a>

GET URL_API/userTypes/{userType_id}
Authorization : Bearer token

_Result example_

```json object)
{
  "id": "39e24a57-d2cd-4e42-948c-ca842de2c1f2",
  "label": "Demandeur emploi",
  "createdAt": "2020-07-20T14:13:51.000Z",
  "updatedAt": "2020-07-20T14:13:51.000Z"
}
```

##### <a name="get_all_users_userTypes"> Get all of the user of one user type (accessible as admin or user) </a>

GET URL_API/userTypes/{userType_id}/users
Authorization : Bearer token

_Result example_

```json (object)
{
  "id": "39e24a57-d2cd-4e42-948c-ca842de2c1f2",
  "label": "Demandeur emploi",
  "createdAt": "2020-07-20T14:13:51.000Z",
  "updatedAt": "2020-07-20T14:13:51.000Z",
  "Users": [
    {
      "id": "013eb59f-644f-4628-96ac-1945dbb0a757",
      "email": "toto@gmail.com"
    },
    {
      "id": "daa0ffee-bf5a-4147-9674-634ed58ee0ee",
      "email": "jean@dev.com"
    }
  ]
},

```

##### <a name="post_one_userTypes"> Post one user type (accessible as admin) </a>

POST URL_API/userTypes/
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "label": "Demandeur emploi"
}
```

_Result example_

```json (object)
{
  "id": "39e24a57-d2cd-4e42-948c-ca842de2c1f2",
  "label": "Demandeur emploi",
  "createdAt": "2020-07-20T14:13:51.000Z",
  "updatedAt": "2020-07-20T14:13:51.000Z"
}
```

##### <a name="put_one_userTypes"> Put one user type (accessible as admin) </a>

PUT URL_API/userTypes/{userType_id}
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "label": "Demandeur"
}
```

_Result example_

```json (object)
{
  "id": "39e24a57-d2cd-4e42-948c-ca842de2c1f2",
  "label": "Demandeur",
  "createdAt": "2020-07-20T14:13:51.000Z",
  "updatedAt": "2020-07-28T14:13:51.000Z"
}
```

##### <a name="delete_one_userType"> Delete one user type (accessible as admin) </a>

DELETE URL_API/userTypes/{userType_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "message": "User type is deleted."
}
```

### <a name="role_route"> Roles route </a>

##### <a name="get_all_roles"> Get all of the roles (accessible as all)</a>

GET URL_API/role

_Result example_

```json (array)
[
  {
    "id": "72ea4c23-fde7-4fca-b4c5-386dc98075ea",
    "label": "ADMIN",
    "createdAt": "2020-07-20T14:13:50.000Z",
    "updatedAt": "2020-07-20T14:13:50.000Z"
  },
  {
    "id": "795fc05f-4dfe-4665-b7c9-846dacb608b0",
    "label": "USER",
    "createdAt": "2020-07-20T14:13:50.000Z",
    "updatedAt": "2020-07-20T14:13:50.000Z"
  }
]
```

### <a name="faq_route"> Faq route </a>

##### <a name="get_all_faq"> Get all of the questions/answers (accessible as admin or user) </a>

GET URL_API/faq

_Result example_

```json (array)
[
  {
    "id": "21634ae0-cffe-4459-af2a-22cdf33f93f3",
    "question": "Comment peut-on réaliser un partenariat avec une entreprise espagnol?",
    "answer": "No sé.",
    "language": "France",
    "createdAt": "2020-07-27T10:14:52.000Z",
    "updatedAt": "2020-07-27T10:14:52.000Z"
  },
  {
    "id": "ffdd80f0-67d0-4fc2-bfef-509706819046",
    "question": "Quelles sont les regles juridiques en espagne?",
    "answer": "Je ne sais pas.",
    "language": "Espagne",
    "createdAt": "2020-07-27T10:14:02.000Z",
    "updatedAt": "2020-07-27T10:14:02.000Z"
  }
]
```

##### <a name="get_one_faq">Get one question/answer (accessible as admin or user) </a>

GET URL_API/faq/{faq_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "id": "21634ae0-cffe-4459-af2a-22cdf33f93f3",
  "question": "Comment peut-on réaliser un partenariat avec une entreprise espagnol?",
  "answer": "No sé.",
  "language": "France",
  "createdAt": "2020-07-27T10:14:52.000Z",
  "updatedAt": "2020-07-27T10:14:52.000Z"
}
```

##### <a name="post_one_faq"> Post one question/answer (accessible as admin) </a>

POST URL_API/faq/{faq_id}
Authorization : Bearer token

```json (object)
{
  "question": "Quelle différence il y a-t-il entre délégué du personnel et délégué syndical ? ",
  "answer": "Les délégués du personnel veillent au respect des droits des salariés...",
  "language": "Francais"
}
```

_Result example_

```json (object)
{
  "id": "40f5a29a-8458-4098-ad4f-cfe735f50b34",
  "question": "Quelle différence il y a-t-il entre délégué du personnel et délégué syndical ? ",
  "answer": "Les délégués du personnel veillent au respect des droits des salariés...",
  "language": "Francais",
  "updatedAt": "2020-07-27T10:43:07.963Z",
  "createdAt": "2020-07-27T10:43:07.963Z"
}
```

##### <a name="put_one_faq"> Put one question/answer (accessible as admin) </a>

PUT URL_API/faq/{faq_id}
Authorization : Bearer token

```json (object)
{
  "answer": "Les délégués du personnel ..."
}
```

_Result example_

```json (object)
{
  "id": "40f5a29a-8458-4098-ad4f-cfe735f50b34",
  "question": "Quelle différence il y-t-il entre délégué du personnel et délégué syndical ? ",
  "answer": "Les délégués du personnel ...",
  "language": "Francais",
  "updatedAt": "2020-07-27T10:43:07.963Z",
  "createdAt": "2020-07-27T10:43:07.963Z"
}
```

##### <a name="delete_one_faq"> Delete a question/answer (accessible as admin) </a>

DELETE URL_API/faq/{faq_id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "message": "FAQ is delete."
}
```

### <a name="partners_route"> Partners route </a>

##### <a name="get_all_partners"> Get all partners (accessible as all) </a>

GET URL_API/partners
Authorization : Bearer token

_Result example_

```json (array)
[
  {
    "id": "8861decb-74a3-4d43-8f45-7ae3230820cc",
    "label": "anec",
    "description": "anec description",
    "url": "http://anec.fr",
    "logo": "https://i.imgur.com/35fqlIR.png",
    "favorite": "1",
    "createdAt": "2020-07-27T10:54:06.000Z",
    "updatedAt": "2020-07-27T10:54:06.000Z"
  },
  {
    "id": "f0cce83a-baf4-434f-a900-6727f4ec0bf4",
    "label": "bihartean",
    "description": "bihartean description",
    "url": "http://bihartean.com",
    "logo": "https://i.imgur.com/Fsvpbf2.png",
    "favorite": "",
    "createdAt": "2020-07-27T10:54:35.000Z",
    "updatedAt": "2020-07-27T10:54:35.000Z"
  }
]
```

##### <a name="get_one_partner> Get one partner (accessible as all) </a>

GET URL_API/partners/{partner_Id}
Authorization : Bearer token

_Result example_

```json (object)
{
  "id": "8861decb-74a3-4d43-8f45-7ae3230820cc",
  "label": "anec",
  "description": "anec description",
  "url": "http://anec.fr",
  "logo": "https://i.imgur.com/35fqlIR.png",
  "favorite": "1",
  "createdAt": "2020-07-27T10:54:06.000Z",
  "updatedAt": "2020-07-27T10:54:06.000Z"
}
```

##### <a name="post_one_partner"> Post one partner (accessible as admin) </a>

POST URL_API/partners/
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "label": "entreprise 1",
  "url": "entreprise1@dev.fr",
  "description": "hello world1",
  "logo": "https://via.placeholder.com/150",
  "favorite": true
}
```

_Result example_

```json (object)
{
  "id": "0b69ab06-5a9d-4477-8711-17b0b60d2a8b",
  "label": "entreprise 1",
  "description": "hello world1",
  "url": "entreprise1@dev.fr",
  "logo": "https://via.placeholder.com/150",
  "favorite": true,
  "updatedAt": "2020-07-27T10:57:40.872Z",
  "createdAt": "2020-07-27T10:57:40.872Z"
}
```

##### <a name="put_one_partner"> Put one partner (accessible as admin) </a>

PUT URL_API/partners/{partner_Id}
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "label": "entreprise 2"
}
```

_Result example_

```json (object)
{
  "id": "0b69ab06-5a9d-4477-8711-17b0b60d2a8b",
  "label": "entreprise 2",
  "description": "hello world1",
  "url": "entreprise1@dev.fr",
  "logo": "https://via.placeholder.com/150",
  "favorite": true,
  "updatedAt": "2020-07-27T10:57:40.872Z",
  "createdAt": "2020-07-27T10:57:40.872Z"
}
```

##### <a name="delete_one_partner"> Delete one partner (accessible as admin) </a>

DELETE URL_API/partners/{partner_Id}
Authorization : Bearer token
Content-Type: application/json

_Result example_

```json (object)
{
  "message": "Partner is delete."
}
```

###  <a name="replies_route"> Replies route </a>

##### <a name="get_all_replies"> Get all replies (accessible as admin or user) </a>

GET URL_API/replies

_Result example_

```json (array)
[
  {
    "id": "c0b8e94b-75c0-4d22-99d6-cd83b01d0265",
    "title": "bonjour",
    "comment": "votre annonce m'interesse.",
    "resume": null,
    "userPostId": "013eb59f-644f-4628-96ac-1945dbb0a757",
    "titlePost": "recherche secretaire",
    "createdAt": "2020-07-27T11:10:01.000Z",
    "updatedAt": "2020-07-27T11:10:01.000Z",
    "UserId": "577f8f5d-a975-4a97-9b16-b41534c7045a",
    "PostId": "2dc9034a-9697-48ad-8f1e-ded51206c138"
  },
  {
    "id": "d0357134-0c0b-447a-86aa-02b8f6799706",
    "title": "bonjour, ",
    "comment": "je uis interessé par votre annonce.",
    "resume": null,
    "userPostId": "013eb59f-644f-4628-96ac-1945dbb0a757",
    "titlePost": "recherche secretaire",
    "createdAt": "2020-07-27T11:09:11.000Z",
    "updatedAt": "2020-07-27T11:09:11.000Z",
    "UserId": "15000946-f746-4d5a-b458-4ea3cd7ca2a6",
    "PostId": "2dc9034a-9697-48ad-8f1e-ded51206c138"
  }
]
```

##### <a name="get_one_reply"> Get one reply (accessible as admin or user) </a>

GET URL_API/replies/{reply_id}

_Result example_

```json (object)
  {
    "id": "c0b8e94b-75c0-4d22-99d6-cd83b01d0265",
    "title": "bonjour",
    "comment": "votre annonce m'interesse.",
    "resume": null,
    "userPostId": "013eb59f-644f-4628-96ac-1945dbb0a757",
    "titlePost": "recherche secretaire",
    "createdAt": "2020-07-27T11:10:01.000Z",
    "updatedAt": "2020-07-27T11:10:01.000Z",
    "UserId": "577f8f5d-a975-4a97-9b16-b41534c7045a",
    "PostId": "2dc9034a-9697-48ad-8f1e-ded51206c138"
  },
```

##### <a name="post_one_reply"> Post one reply (accessible as admin or user) </a>

POST URL_API/replies/apply
Authorization : Bearer token
Content-Type: application/json

```json (object)
{
  "title": "hello",
  "comment": "votre annonce m'interesse.",
  "resume": "https://via.placeholder.com/150",
  "UserId": "15000946-f746-4d5a-b458-4ea3cd7ca2a6",
  "PostId": "2dc9034a-9697-48ad-8f1e-ded51206c138",
  "userPostId": "013eb59f-644f-4628-96ac-1945dbb0a757",
  "titlePost": "recherche secretaire"
}
```

_Result example_

```json (object)
{
  "id": "c0b8h15d-75c0-4d22-99d6-cd83b01d0265",
  "title": "hello",
  "comment": "votre annonce m'interesse.",
  "resume": "https://via.placeholder.com/150",
  "UserId": "15000946-f746-4d5a-b458-4ea3cd7ca2a6",
  "PostId": "2dc9034a-9697-48ad-8f1e-ded51206c138",
  "userPostId": "013eb59f-644f-4628-96ac-1945dbb0a757",
  "titlePost": "recherche secretaire",
  "updatedAt": "2020-07-27T10:57:40.872Z",
  "createdAt": "2020-07-27T10:57:40.872Z"
}
```

##### <a name="delete_one_reply"> Delete one reply (accessible as admin or user) </a>

DELETE URL_API/replies/{reply_id}

_Result example_

```json (object)
{
  "message": "Reply is deleted."
}
```

### <a name="mail_route"> Mail route (accessible as all) </a>

#####  <a name="post_mail"> Post a mail </a>

POST URL_API/sendMail

Content-Type: application/json

```json (object)
{
  "lastname": "toto",
  "firstname": "Jean",
  "email": "toto@dev.com",
  "text": "subject",
  "textarea": "message"
}
```

_Result example_

```json (object)
{
  "mail": true
}
```

## WHO ARE WE ?

We are a 7 developpers team who did this project.

<table>
<thead>
<tr>
<th colspan="2">

#### Christelle Conrozier

<img src="https://avatars3.githubusercontent.com/u/61701315?s=460&u=a65acc44f7d62aee4239472598b77943a5d96773&v=4" alt="christelle conrozier" width="20%"> </img>

</th>
<th colspan="2">

#### Charles Henry Le Nué

<img src="https://avatars2.githubusercontent.com/u/49599325?s=460&u=05cbceef4478a1c0423bee76b56bf21110d5a037&v=4" alt="Charles Henry Le Nué" width="15%"> </img>

</th>
<th colspan="2">

#### Anaïs Jouaret

<img src="https://avatars1.githubusercontent.com/u/61586982?s=460&u=a45da6c220317d3f065c815acd9c9ef1b8337586&v=4" alt="Anaïs Jouaret" width="15%"> </img>

</th>
<th colspan="2">

#### Marie Josselin

<img src="https://avatars2.githubusercontent.com/u/61701345?s=460&u=c8614f42920e62a230db5ade3ff770bf293f68f2&v=4" alt="Marie Josselin" width="15%"> </img>

</th>
</tr>
</thead>
<tbody>
<tr>
<td>

[_Github_](https://github.com/christellec64)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/christelle-conrozier/)

</td>
<td>

[_Github_](https://github.com/Charlyln)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/charles-henry-le-nu%C3%A9/)

</td>
<td>

[_Github_](https://github.com/nanou-11)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/anais-jouaret/)

</td>
<td>

[_Github_](https://github.com/MarieJoss)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/marie-josselin)

</td>
</tr>
</tbody>
</table>

<table>
<thead>
<tr>
<th colspan="2">

#### Maxime Urbanski

<img src="https://avatars2.githubusercontent.com/u/61539540?s=460&u=65e9ac46108c3c20748a49526e6c09abb5bfa4b8&v=4" alt="Maxime Urbanski" width="10%"> </img>

</th>
<th colspan="2">

#### Lionel Rouge

</th>
<th colspan="2">

#### Munio Campandegui

<img src="https://avatars2.githubusercontent.com/u/60346563?s=460&u=e03af1052dcbefbc2c60f1a639dbff6095342888&v=4" alt="Munio Campandegui" width="10%"> </img>

</th>
</tr>
</thead>
<tbody>
<tr>
<td>

[_Github_](https://github.com/Maxiloudoi)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/maxime-urbanski/)

</td>
<td>

[_Github_](https://github.com/lio-code)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/lionel-rouge/)

</td>
<td>

[_Github_](https://github.com/whitewolf64)

</td>
<td>

[_Linkedin_](https://www.linkedin.com/in/campandegui-munio/)

</td>
</tr>
</tbody>
</table>

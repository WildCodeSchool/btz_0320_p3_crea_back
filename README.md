## VARIABLE ENVIRONMENT FOR DATABASE

_please create a ".env" with those fields for using the database_

- DBNAME="(name of database)"
- DBUSER= (your user name for database)
- DBPASS="(password to access database)"
- DBDIALECT="(dialect for database language ex: sql)"
- DBHOST="(host server for database)"
  -SECRET=" a random set of unique character for security(SALT)"

## BEFORE STARTING SERVER

\*Go to users.http and send POST request ##Auth with the following information:

    "email" : "admin@dev.com",
    "password" : "admin"

## MODULES to INSTALL from package.json with npm start:

    "@hapi/joi"(schema description language and data validator for JavaScript. Used in validor.js to fix a failed test)

    "bcrypt"(a password-hashing function with a salt)

    "chai"(BDD / TDD assertion library)

    "chai-http"(addon plugin for the Chai Assertion Library)

    "cors" (to connect back and front-end)

    "dotenv"( module that loads environment variables from a .env file into process.env to made password secret)

    "express"(a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications)

    "jsonwebtoken"(allows you to decode, verify and generate tokens with Json format)

    "mysql"(open-source relational database management system)

    "mysql2"( A modern, simple and very fast MySQL library with additionnal features)

    "nodemon"(a utility that will monitor for any changes in your source and automatically restart your server)

    "pg"()

    "pg-hstore"(A node package for serializing and deserializing JSON data to hstore format)

    "sequelize"(ORM for MySQL)

require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const sequelize = require("./sequelize");
var cors = require("cors");
const users = require("./routes/users.route");
const type_post = require("./routes/type_post.route");
const posts = require("./routes/users.posts.route");
const jobCategory = require("./routes/job-category.route");
const userTypes = require("./routes/userTypes.route");
const faqs = require("./routes/faq.route");
const partners = require("./routes/partner");

require("./association");

app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/user/post/type_post", type_post);
app.use("/users/post/jobCategory", jobCategory);
app.use("/users/posts", posts);
app.use("/users/userTypes", userTypes);
app.use("/faq", faqs);
app.use("/partners", partners);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur CREA_PROJECT");
});

if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync({ force: true })
    .then(() => {
      return sequelize.authenticate();
    })
    .then(() => {
      app.listen(port, (err) => {
        if (err) {
          throw new Error("Something really bad happened ...");
        }
        console.log(`Server is listening on ${port}`);
      });
    })
    .catch((err) => {
      console.log("enable to join database", err.message);
    });
}

module.exports = app;

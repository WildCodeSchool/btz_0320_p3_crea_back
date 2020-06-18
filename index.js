require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const sequelize = require("./sequelize");
const users = require("./routes/users.route");
const type_post = require("./routes/type_post.route");

app.use(express.json());
app.use("/users", users);
app.use("/user/post/type_post", type_post);
const posts = require("./routes/users.posts.route");
const jobCategory = require("./routes/job-category.route");
const userTypes = require("./routes/userTypes.route");

app.use(express.json());
app.use("/users", users);
app.use("/users/post/jobCategory", jobCategory);
app.use("/users/posts", posts);
app.use("/users/userTypes", userTypes);

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

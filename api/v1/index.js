const express = require("express");

const users = require("./routes/users.route");
const userTypes = require("./routes/userTypes.route");
const faq = require("./routes/faq.route");
const partners = require("./routes/partners.route");
const posts = require("./routes/posts.route");
const postTypes = require("./routes/postTypes.route");
const jobCategories = require("./routes/jobCategories.route");
const activityFields = require("./routes/activityFields.route");
const auth = require("./routes/auth.route");
const mail = require("../../mail");

const router = express.Router();

router.use("/users", users);
router.use("/userTypes", userTypes);
router.use("/partners", partners);
router.use("/posts", posts);
router.use("/postTypes", postTypes);
router.use("/jobCategories", jobCategories);
router.use("/activityFields", activityFields);
router.use("/faq", faq);
router.use("/auth", auth);

router.use("/sendMail", mail);

module.exports = router;

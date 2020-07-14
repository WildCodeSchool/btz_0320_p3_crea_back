const express = require("express");

const authRole = require("../../../middleware/authRole");
const user = require("../routes/auth.route");
const User = require("../../../models/User");
const Post = require("../../../models/Post");
const UserType = require("../../../models/UserType");
const Role = require("../../../models/Role");
const ActivityField = require("../../../models/ActivityField");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", authRole("ADMIN"), async (req, res) => {
  try {
    if (req.user) {
      const users = await User.findAll({
        include: [
          {
            model: UserType,
          },
          {
            model: ActivityField,
          },
          {
            model: Role,
          },
        ],
      });
      res.status(200).json(users);
    } else {
      throw new Error("You are not admin!");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  const { id } = req.params;
  try {
    // if (req.user.role === "USER" && req.user.id !== id) {
    //   res.status(401).json({
    //     message: "You are not allowed to access this",
    //   });
    // } else {
    //   const user = await User.findOne({ where: { id } });
    //   res.status(200).json(user);
    // }
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post("/", authRole("ADMIN"), async (req, res) => {
//   const {
//     lastName,
//     firstName,
//     email,
//     password,
//     localisation,
//     phone_number,
//     phone_number2,
//     schoolName,
//     companyName,
//     siret,
//     qualification,
//     mobility,
//     name_organisation,
//     isActive,
//     logo,
//     UserTypeId,
//     ActivityFieldId,
//     RoleId,
//   } = req.body;
//   try {
//     const user = await User.create({
//       lastName,
//       firstName,
//       email,
//       password,
//       localisation,
//       phone_number,
//       phone_number2,
//       schoolName,
//       companyName,
//       siret,
//       qualification,
//       mobility,
//       name_organisation,
//       isActive,
//       logo,
//       UserTypeId,
//       ActivityFieldId,
//       RoleId,
//     });
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

router.put("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  let {
    lastName,
    firstName,
    email,
    password,
    localisation,
    country,
    phone_number,
    phone_number2,
    schoolName,
    companyName,
    siret,
    qualification,
    mobility,
    name_organisation,
    isActive,
    logo,
    UserTypeId,
    ActivityFieldId,
    RoleId,
  } = req.body;
  const { id } = req.params;
  // if (req.user.role === "USER" && req.user.id !== id) {
  //   res.status(401).json({
  //     message: "You are not allowed to modify this",
  //   });
  // }
  try {
    await User.update(
      {
        lastName,
        firstName,
        email,
        password,
        localisation,
        country,
        phone_number,
        phone_number2,
        schoolName,
        companyName,
        siret,
        qualification,
        mobility,
        name_organisation,
        isActive,
        logo,
        UserTypeId,
        ActivityFieldId,
        RoleId,
      },
      { where: { id }, individualHooks: true }
    );
    const user = await User.findByPk(id);
    res.status(202).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    // if (req.user.role === "USER" && req.user.id !== id) {
    //   res.status(401).json({
    //     message: "You are not allowed to delete this",
    //   });
    // }
    // const user = await User.destroy({
    //   where: { id },
    // });
    // res.status(204).send("L'utilisateur a bien été effacé");
    // if (req.user.role === "USER") {
    //   console.log(id);
    //   await User.destroy({
    //     where: { id: req.user.id },
    //   });
    //   res.status(204).end();
    // }
    // if (req.user.role === "ADMIN") {
    //   await User.destroy({
    //     where: { id },
    //   });
    //   res.status(204).end();
    // }
    await User.destroy({
      where: { id },
    });
    res.status(204).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

// récupérer les posts d'un utilisateur
router.get("/:id/posts", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role === "USER" && req.user.id !== id) {
      res.status(401).json({
        message: "You are not allowed to delete this",
      });
    }
    const posts = await Post.findAll({ where: { UserId: id } });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const express = require("express");
const Role = require("../../../models/Role");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const role = await Role.findAll();
        res.status(200).json(role);
      } catch (err) {
        res.status(400).json(err);
      }
})

module.exports = router;
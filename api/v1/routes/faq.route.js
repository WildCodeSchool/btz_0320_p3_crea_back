const express = require("express");
const router = express.Router();
const Faq = require("../../../models/Faq");
const authRole = require("../../../middleware/authRole");

router.get("/", authRole(["ADMIN", "USER"]), async (req, res) => {
    try {
        const faqs = await Faq.findAll();
        res.status(200).json(faqs);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/:id", authRole(["ADMIN", "USER"]), async (req, res) => {
    const { id } = req.params;
    try {
        const faq = await Faq.findOne({ where: { id } });
        res.status(200).json(faq);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/", authRole("ADMIN"), async (req, res) => {
    const { question, answer, language } = req.body;
    try {
        const faq = await Faq.create({
            question,
            answer,
            language,
        });
        res.status(201).json(faq);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.put("/:id", authRole("ADMIN"), async (req, res) => {
    const { id } = req.params;
    const { question, answer, language } = req.body;
    try {
        await Faq.update(
            { question, answer, language },
            { where: { id } }
        );
        const faq = await Faq.findByPk(id)
        res.status(202).json(faq);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.delete("/:id",authRole("ADMIN"), async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await Faq.destroy({ where: { id } });
        res.status(204).json({message : "FAQ is delete."});
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;

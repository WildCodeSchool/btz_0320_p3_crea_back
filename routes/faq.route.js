const express = require("express");
const faqs = express.Router();
const Faq = require("../models/Faq");

faqs.get("/", async (req, res) => {
    try {
        const faqs = await Faq.findAll();
        res.status(200).json(faqs);
    } catch (err) {
        res.status(400).json(err);
    }
});

faqs.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const faq = await Faq.findOne({ where: { id } });
        res.status(200).json(faq);
    } catch (err) {
        res.status(400).json(err);
    }
});

faqs.post("/", async (req, res) => {
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

faqs.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { question, answer, language } = req.body;
    try {
        const faq = await Faq.update(
            { question, answer, language },
            { where: { id } }
        );
        res.status(202).json(faq);
    } catch (err) {
        res.status(422).json(err);
    }
});

faqs.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await Faq.destroy({ where: { id } });
        res.status(205).send("La question a bien été effacé");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = faqs;

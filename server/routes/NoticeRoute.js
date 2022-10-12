const router = require("express").Router();
const noticeSchema = require("./NoticeModel");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    try {
        req.body.username = req.user.username
        const newContact = new noticeSchema(req.body);
        const message = await newContact.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await noticeSchema.find({ username: req.user.username }).exec();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:_id", authMiddleware,async (req, res) => {
    try {
        const posts = await noticeSchema.findByIdAndDelete(req.params._id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id",authMiddleware, async (req, res) => {
    try {
        const updatedProduct = await noticeSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json("m");
    }
});

module.exports = router;

const router = require("express").Router();
const jwt = require('jsonwebtoken')
const authSchema = require("./AuthModel");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authSchema.findOne({ email: email })
        if (!user) {
            return res.status(401).send("Invalid Credentials");
        }
        if (password !== user.password) {
            return res.status(401).send("Invalid Credentials");
        }
        jwt.sign(
            { email: user.email, username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            (err, token) => {
                if (err) throw err;
                res.status(200).json(token);
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        console.log(email, password, username);
        const newUser = new authSchema({ email, password, username });
        await newUser.save();

        const user = { username: username, email: email }
        const token = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        return res.status(200).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;

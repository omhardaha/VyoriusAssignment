const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send(`Unauthorized`);
        }
        jwt.verify(
            req.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                console.log(err)
                if (err) return res.sendStatus(403)
                req.user = user
                next()
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(401).send(`Unauthorized`);
    }
};

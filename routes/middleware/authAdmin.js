require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const authAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) res.status(401).json(err);

            if (payload.isAdmin) {
                req.user = payload;
                next();
            } else {
                res.status(403).json({
                    message: "You need to administrator rights to access this.",
                });
            }
        });
    } else {
        res.status(401).json({ message: "no token provided" });
    }
};

module.exports = authAdmin;

//todo auth user why not admin ? 403.

// req.user = {
//     email: payload.email,
//     isAdmin: payload.isAdmin,
// };  isAdmin: payload.isAdmin,
// };

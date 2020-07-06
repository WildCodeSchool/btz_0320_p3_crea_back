require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const authRole = (role) => (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const RoleIsArray = Array.isArray(role);

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) res.status(401).json(err);

            if (!RoleIsArray && payload.role === role) {
                req.user = payload;
                next();
            } else if (RoleIsArray && role.some((ar) => ar === payload.role)) {
                req.user = payload;
                next();
            } else {
                res.status(403).json({
                    message: "You are not allowed to access this",
                });
            }
        });
    } else {
        res.status(401).json({ message: "no token provided" });
    }
};

module.exports = authRole;

// req.user = {
//     email: payload.email,
//     isAdmin: payload.isAdmin,
// };  isAdmin: payload.isAdmin,
// };

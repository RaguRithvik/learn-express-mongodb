const jwt = require("jsonwebtoken");

const validateJWTtoken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is unauthorized");
                }

                req.user = decoded.user;
                next();
            });
        } else {
            res.status(401);
            throw new Error("User is unauthorized or Token is missing");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = validateJWTtoken;

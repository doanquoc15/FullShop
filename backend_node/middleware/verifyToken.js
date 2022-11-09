const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_KEY, (error, user) => {
            if (error)
                res.status(403).json('Invalid auth token!');

            const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
            req.user = decoded;
            next();
        })
    }
    else {
        return res.status(401).json('You are not authenticated!');
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req, req.user)
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json('Access denied.Not authorized!')
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json('Access denied.Not authorized!')
        }

    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
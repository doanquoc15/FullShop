const jwt = require('jsonwebtoken');

//create token
const authToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SEC_KEY,{expiresIn:'3d'});
    return token;
}

module.exports = authToken;
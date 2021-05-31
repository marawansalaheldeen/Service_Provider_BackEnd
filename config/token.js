const jwt = require("jsonwebtoken");
// const { ExpiredSecurityTokenException, UnAuthorizedToken } = require('../helper/exception.js');
// const requestHandler = require('../helper/requestHandler');

// const {TOKEN_KEY} = require('./index');
const jwtExpirySeconds = '8000s'; // 24 hours

// create token by user email
const createToken = (userEmail) => {
    // console.log(TOKEN_KEY);
    const claims = { issuer: userEmail, subject: 'auth' }
    return token = jwt.sign(claims, "token-secret-key", { expiresIn: jwtExpirySeconds })
}

// verify token 
const verifyToken = (req, res, next) => {
    // console.log("eneterd verify token", );
    console.log("eneterd verify token", req.body.token);
    jwt.verify(req.body.token, "token-secret-key", (err, decoded) => {
        try {
            if (err) {
                if (err.expiredAt) {
                    throw new ExpiredSecurityTokenException('Token Expired')
                } else {
                    throw new UnAuthorizedToken('Token UnAuthorized')
                }

            } else {
                console.log("token verified");
                req.decoded = decoded;
                next()
                // callback("user Verified", decoded.issuer)
            }
        } catch (err) {
           console.log("err", err);
        }

    });
}




const verifyRequestToken =(req,res,next)=>{
    console.log("eneterd for token");
        let token = req.headers['x-access-token'];
        jwt.verify(token, "token-secret-key", (err, decoded) => {
            try {
                if (err) {
                    if (err.expiredAt) {
                        res.json('Token Expired');
                    } else {
                        console.log("token un auth");
                        res.json('Token UnAuthorized');
                    }
    
                } else {
                    console.log(decoded);
                    req.decoded = decoded;
                    next();
                }
            } catch (err) {
                res.status(401).json({'error':'please authnticate'})
            }
        });
}


module.exports = {
    createToken,
    verifyToken,
    verifyRequestToken
}
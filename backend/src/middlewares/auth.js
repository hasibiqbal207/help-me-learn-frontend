const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res, next) => {

    // console.log('Into Check auth middleware function'+req.headers.authorization);

    let token;

    if (req.headers.authorization) {
    
    try{

        token = req.headers.authorization.split(' ')[1];  // Bearer Token
        // console.log(token);
    } catch(error) {
        // console.log('Authentication failed');
        return next(error);
    }
    


    try{

        if(!token)
        {
            throw new Error("Authentication failed");
         }
        const decodedToken= jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.userData = {userID : decodedToken.userID };
        next();
    } catch(error)
    {
        //'Token did not match-Authentication failed'
        res.status(400).send('Invalid Token!')
    }

  }
  else 
    {
        res.status(400).send('Error, No Token provided with Request')
    }

    
} 

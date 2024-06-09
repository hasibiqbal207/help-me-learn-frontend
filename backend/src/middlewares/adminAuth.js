const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  isAdmin: (req, res, next) => {
    let token;

    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      return next(error);
    }

    if (token.length > 0) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // console.log(decodedToken);
        if (decodedToken.user_type === 100) {
          next();
        } else {
          res.status(403).json({ status: false, message: "Permission denied" });
        }
      } catch (error) {
        res.status(401).json({ status: false, message: "Bad request" });
      }
    } else {
      res.status(400).send("No token found!");
    }
  },
};

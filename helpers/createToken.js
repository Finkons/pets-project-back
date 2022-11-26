const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const createToken = id => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  return token;
};

module.exports = createToken;

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const createToken = id => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

module.exports = createToken;

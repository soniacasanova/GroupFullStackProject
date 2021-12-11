const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config");
const { errUnauthorized } = require("../common/errors");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

const createToken = (valuer_id) => {
  const token = jwt.sign({ valuer_id }, config.jwt.secret, { expiresIn: config.jwt.expiration });
  return {
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: config.jwt.expiration,
  }
}

const decodeToken = (token) => {
  try {
    const contents = jwt.verify(token, config.jwt.secret);
    return contents;
  } catch (err) {
    switch (err.name) {
      case "JsonWebTokenError": {
        errUnauthorized('Token erroni');
        break;
      }
      case "TokenExpiredError": {
        errUnauthorized('Token caducat');
        break;
      }
      default:
        throw err;
    }
  }
}

module.exports = {
  hashPassword,
  comparePasswords,
  createToken,
  decodeToken,
}
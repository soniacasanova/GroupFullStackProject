const { catchErrors, errUnauthorized } = require("../common/errors");
const auth = require('./auth.service');
const Valuer = require('../entities/valuers/valuers.model');

const authenticated = catchErrors(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    errUnauthorized('Falta autorització');
  } 
  if (!authHeader.startsWith('Bearer ')) {
    errUnauthorized('Format autorització erroni');    
  }
  const token = authHeader.slice('Bearer '.length);
  const { valuer_id } = auth.decodeToken(token);

  const valuer = await Valuer.findOne({ valuer_id }).lean().exec();
  if (!valuer) {
    errUnauthorized('Valorador eliminat');
  }
  req.valuer = valuer;
  next();
});

module.exports = {
  authenticated,
}
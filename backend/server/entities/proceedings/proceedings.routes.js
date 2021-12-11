const { authenticated } = require("../../auth/auth.middlewares");
const { catchErrors } = require("../../common/errors");
const Proceeding = require("./proceedings.model");

const getProceedings = catchErrors(async (req, res) => {
  let postcodes = req.query.postcode;
  if (!postcodes) {
    postcodes = req.valuer.postcodes;
  }
  let requestDate = req.query.date;
  if (!requestDate) {
    requestDate = new Date().toISOString().slice(0, 10);
  }
  const proceedings = await Proceeding.find({
    state: "Pendent",
    "address.postcode": { $in: postcodes },
    request_date: { $lt: requestDate },
  })
    .sort("request_date")
    .lean()
    .exec();
  res.status(200).send(proceedings);
});

const getAllPostcodes = catchErrors(async (req, res) => {
  const allPostcodes = await Proceeding.find()
    .distinct("address.postcode")
    .lean()
    .exec();
  allPostcodes.map((item, index) => {
    allPostcodes[index] = {
      postcode: item,
      selected: req.valuer.postcodes.includes(item),
    };
  });
  res.status(200).send(allPostcodes);
});

const addRoutesTo = (app) => {
  app.get("/proceedings", authenticated, getProceedings);
  app.get("/postcodes", authenticated, getAllPostcodes);
};

module.exports = {
  addRoutesTo,
};
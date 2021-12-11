const { authenticated } = require("../../auth/auth.middlewares");
const { catchErrors } = require("../../common/errors");
const Proceeding = require("../proceedings/proceedings.model");
const Visit = require("./visits.model");

const addVisit = catchErrors(async (req, res) => {
  const visit = { ...req.body, valuer_ObjectId: req.valuer._id };
  const newVisit = await Visit.create(visit);
  if (newVisit) {
    await Proceeding.findOneAndUpdate({ _id: visit.proceeding_ObjectId },{ state: "Citat" });
  }
  res.status(201).send(newVisit);
});

const removeVisit = catchErrors(async (req, res) => {
  const visit = await Visit.findOneAndRemove({ _id: req.params.id });
  if (visit) {
    await Proceeding.findOneAndUpdate({ _id: visit.proceeding_ObjectId },{ state: "Pendent" });
  }
  res.status(201).send(visit);
});

const getVisitsOfTheDay = catchErrors(async (req, res) => {
  let visitsOfTheDay = req.params.day;
  if (!visitsOfTheDay) {
    visitsOfTheDay = new Date().toISOString().slice(0, 10);
  }
  const visits = await Visit.find({
    visit_date: {
      $gte: new Date(`${visitsOfTheDay}T00:00:00.000Z`),
      $lte: new Date(`${visitsOfTheDay}T23:59:59.999Z`)
    },
    valuer_ObjectId: req.valuer._id,
  })
    .populate('proceeding_ObjectId', 'name phone_numbers address')
    .sort('visit_date')
    .lean()
    .exec();
  res.status(200).send(visits);
});

const addRoutesTo = (app) => {
  app.post("/visits", authenticated, addVisit);
  app.delete("/visits/:id", authenticated, removeVisit);
  app.get("/visits/:day", authenticated, getVisitsOfTheDay);
};

module.exports = {
  addRoutesTo,
};

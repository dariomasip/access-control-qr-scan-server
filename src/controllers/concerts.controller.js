const Concert = require("../models/Conciert");

const ConcertController = {};

ConcertController.addConcert = async (req, res) => {
  // Create a new concert model
  const concert = new Concert({
    location: "Barclays Center",
    date: new Date(),
    time: "8:00 PM",
    seats: 10000,
  });

  // Add 100 access codes to the concert
  for (let i = 0; i < 23; i++) {
    const code = `${Math.random().toString(36).substring(7)}`;
    concert.validationCodes.push({
      code,
      status: "valid",
      validatedAt: new Date(),
      reason: null,
      expirationDate: new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365
      ),
    });
  }

  await concert.save();

  res.sendStatus(200);
};

ConcertController.getConcert = async (req, res) => {
  const concerts = await Concert.find();

  res.send({ concerts });
};

ConcertController.getNextConcert = async (req, res) => {
  const concert = await Concert.findOne({}, { _id: 1 }).sort({
    date: -1,
  });

  if (concert) {
    const { _id } = concert;
    res.send({ _id });
  } else {
    res.status(404).send({ error: "No se encontraron conciertos." });
  }
};

ConcertController.setUpdateAt = async (req, res) => {
  const updatedDate = await Concert.updateOne(
    { _id: req.params.concert },
    { $set: { updateAt: req.body.updateAt } }
  );

  if (updatedDate.modifiedCount > 0) {
    res.sendStatus(200);
  } else {
    res.status(201).send({ msg: "No hubieron modificaciones." });
  }
};

ConcertController.getUpdateAt = async (req, res) => {
  const updatedAt = await Concert.findOne(
    { _id: req.params.concert },
    { updateAt: 1 }
  );

  if (updatedAt) {
    const { updateAt } = updatedAt;
    res.send({ updateAt });
  } else {
    res.status(404).send({ error: "No se encontró el concierto." });
  }
};

module.exports = ConcertController;

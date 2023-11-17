const Concert = require("../models/Conciert");

const ConcertController = {};

ConcertController.createConcert = async (req, res) => {
  try {
    const { location, date } = req.body;

    // Crear un nuevo modelo de concierto
    const concert = new Concert({
      location,
      date: new Date(`${date}T00:00:00-03:00`),
    });

    const concertId = await concert.save();

    res.send({ idConcert: concertId._id });
  } catch (error) {
    console.error("Error al crear el concierto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

ConcertController.getConcert = async (req, res) => {
  const concerts = await Concert.find();

  res.send({ concerts });
};

ConcertController.getNextConcert = async (req, res) => {
  const concert = await Concert.findOne(
    {},
    { _id: 1, date: 1, location: 1 }
  ).sort({
    date: -1,
  });

  if (concert) {
    const { _id, date, location } = concert;
    res.send({ _id, date, location });
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

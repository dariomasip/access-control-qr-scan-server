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

module.exports = ConcertController;

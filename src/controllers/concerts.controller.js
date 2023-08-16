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

ConcertController.addRecordCode = async (req, res) => {
  const concert = await Concert.findById(req.params.concert);
  try {
    const recordData = req.body;
    console.log(
      "🚀 ~ file: concerts.controller.js:43 ~ ConcertController.addRecordCode= ~ req.body:",
      req.body
    );

    // Realiza validaciones en los datos si es necesario

    await Concert.updateOne(
      { _id: concert },
      { $push: { registrationCodes: recordData } }
    );

    console.log("Código de registro agregado exitosamente");
    res.status(200).send("Código de registro agregado exitosamente");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al agregar el código de registro");
  }
};

ConcertController.deleteAndLoadCodes = async (req, res) => {
  try {
    // Borra el contenido del array en todos los documentos
    await Concert.updateMany(
      {
        _id: "64dc490f6087bf6f5c14f4fb",
      },
      { $set: { validationCodes: [] } }
    );
    console.log("Contenido del array eliminado en todos los documentos");

    const filledData = req.body.map((item) => {
      // Rellena los campos del objeto según tus necesidades
      const filledItem = {
        code: item.code || "",
        type: item.type || "",
        // Agrega más campos y asigna valores según sea necesario
      };
      return filledItem;
    });

    // Agrega los nuevos datos al array en todos los documentos
    await Concert.updateMany(
      {
        _id: "64dc490f6087bf6f5c14f4fb",
      },
      { $push: { validationCodes: { $each: filledData } } }
    );
    console.log("Nuevos datos agregados exitosamente");
  } catch (error) {
    console.error("Error:", error);
  }

  res.sendStatus(200);
};

module.exports = ConcertController;

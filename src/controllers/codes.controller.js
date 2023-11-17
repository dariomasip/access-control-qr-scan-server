const Concert = require("../models/Conciert");

const CodesController = {};

CodesController.addRecordCode = async (req, res) => {
  try {
    const recordData = req.body;
    const concert = await Concert.findById(req.params.concert);

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

CodesController.getValidCodes = async (req, res) => {
  const codes = await Concert.findById(req.params.concert, {
    validationCodes: 1,
  });

  res.send(codes);
};

CodesController.getRecordsCodes = async (req, res) => {
  const codes = await Concert.findById(req.params.concert, {
    registrationCodes: 1,
  });

  res.send(codes);
};

CodesController.deleteAndLoadCodes = async (req, res) => {
  try {
    // Borra el contenido del array en todos los documentos
    await Concert.updateMany(
      {
        _id: req.params.concert,
      },
      { $set: { validationCodes: [] } }
    );
    console.log("Contenido del array eliminado en todos los documentos");

    const filledData = req.body.map((item) => {
      // Rellena los campos del objeto según tus necesidades
      const filledItem = {
        code: item.code || "",
        type: item.type || "",
        user: item.user || "",
        // Agrega más campos y asigna valores según sea necesario
      };
      return filledItem;
    });

    // Agrega los nuevos datos al array en todos los documentos
    await Concert.updateMany(
      {
        _id: req.params.concert,
      },
      { $push: { validationCodes: { $each: filledData } } }
    );

    const currentDate = new Date();

    const updatedDate = await Concert.updateOne(
      { _id: req.params.concert },
      { $set: { updateAt: currentDate } }
    );

    console.log("Nuevos datos agregados exitosamente");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = CodesController;

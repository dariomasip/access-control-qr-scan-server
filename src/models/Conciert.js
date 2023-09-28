const { Schema, model } = require("mongoose");

const concertSchema = new Schema([
  {
    id: Number,
    date: Date,
    updateAt: Date,
    location: String,
    allowedHours: String,
    validationCodes: [
      {
        code: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        user: {
          type: String,
        },
        expirationDate: {
          type: Date,
        },
      },
    ],
    registrationCodes: [
      {
        code: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["valid", "invalid"],
        },
        type: {
          type: String,
        },
        user: {
          type: String,
        },
        validatedAt: {
          type: Date,
          required: true,
        },
        reason: {
          type: String,
          enum: ["code_not_found", "code_already_scanned", "overtime", null],
        },
      },
    ],
  },
]);

const Concert = model("concert", concertSchema);

module.exports = Concert;

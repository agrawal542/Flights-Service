const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/comman");
const AppError = require("../utils/errors/app-error");

const REQUIRED_FIELDS = [
  { key: "flightNumber", message: "Flight number is required." },
  { key: "airplaneId", message: "Airplane ID is required." },
  { key: "departureAirportCode", message: "Departure airport code is required." },
  { key: "arrivalAirportCode", message: "Arrival airport code is required." },
  { key: "arrivalTime", message: "Arrival time is required." },
  { key: "departureTime", message: "Departure time is required." },
  { key: "price", message: "Price is required." },
];

function validCreateRequest(req, res, next) {
  const missingFields = [];

  // Iterate through required fields to find missing ones
  REQUIRED_FIELDS.forEach((field) => {
    if (!req.body[field.key]) {
      missingFields.push(field.message);
    }
  });

  // If there are missing fields, return a structured error response
  if (missingFields.length > 0) {
    ErrorResponse.message = "Invalid request data for creating a flight.";
    ErrorResponse.error = new AppError(missingFields, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // If all fields are present, proceed to the next middleware/controller
  next();
}

module.exports = { validCreateRequest };

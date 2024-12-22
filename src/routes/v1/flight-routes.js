
const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

const router = express.Router();

// /api/v1/flights  POST
router.post('/', FlightMiddleware.validCreateRequest, FlightController.createFlight)

// /api/v1/flights  GET
router.get('/', FlightController.getAllFlights)



module.exports = router;
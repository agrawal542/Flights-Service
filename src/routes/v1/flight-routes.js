
const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

const router = express.Router();

// /api/v1/flights  POST
router.post('/', FlightMiddleware.validCreateRequest, FlightController.createFlight)



module.exports = router;
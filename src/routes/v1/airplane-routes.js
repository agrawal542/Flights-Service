const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middlewares");

const router = express.Router();

// /api/v1/airplanes
router.post('/', AirplaneMiddleware.validCreateRequest, AirplaneController.createAirplane)


module.exports = router;
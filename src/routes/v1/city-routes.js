const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");


const router = express.Router();

// /api/v1/cities  POST
router.post('/', CityMiddleware.validCreateRequest, CityController.createCity)

// /api/v1/cities/:id  DELETE
router.delete('/:id', CityController.deleteCity)

// /api/v1/cities/:id  PATCH
router.patch('/:id', CityMiddleware.validCreateRequest, CityController.updateCity)



module.exports = router;
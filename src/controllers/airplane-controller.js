const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/comman");
const AppError = require("../utils/errors/app-error");

/**
 * POST: /airplanes
 * req-body { modelNumber : 'airbus320', capacity : 200 }
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Succesfully create an airplane";
        bnne
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        if (error.name == 'ReferenceError') {
            ErrorResponse.error = new AppError([error.message], StatusCodes.INTERNAL_SERVER_ERROR);
        } else {
            ErrorResponse.error = error
        }
        ErrorResponse.message = "Something went wrong while creating airplane.";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

module.exports = { createAirplane }
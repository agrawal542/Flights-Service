const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/comman");

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
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * GETs: /airplanes
 */
async function getAirplanes(req, res) {
    try {
        const airplane = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * GETs: /airplanes/:id
 */
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id)
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}



/**
 * DELETE /airplanes/:id
 */
async function deleteAirplane(req, res) {
    try {
        const airplane = await AirplaneService.deleteAirplane(req.params.id)
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * UDPATE /airplanes
 */
async function updateAirplane(req, res) {
    try {
        const id = req.body.id;
        const data = {
            capacity: req.body.capacity
        }
        const airplane = await AirplaneService.updateAirplane(id, data)
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}
module.exports = { createAirplane, getAirplanes, getAirplane, deleteAirplane, updateAirplane }
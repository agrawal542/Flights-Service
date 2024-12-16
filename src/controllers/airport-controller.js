const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/comman");

/**
 * POST: /airports
 * req-body { name : 'IDI', code : 'DEL', cityId:3}
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        })
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * GETs: /airports
 */
async function getAirports(req, res) {
    try {
        const airport = await AirportService.getAirports()
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * GETs: /airports/:id
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * DELETE /airports/:id
 */
async function deleteAirport(req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id)
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * UDPATE /airports
 */
async function updateAirport(req, res) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        }
        const airport = await AirportService.updateAirport(id, data)
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}
module.exports = { createAirport, getAirports, getAirport, deleteAirport, updateAirport }
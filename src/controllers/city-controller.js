const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/comman");

/**
 * POST: /cities
 * req-body { name : 'Londen' }
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name,
        })
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * DELETE /cities/:id
 */
async function deleteCity(req, res) {
    try {
        const city = await CityService.deleteCity(req.params.id)
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

/**
 * UDPATE /cities/:id
 */
async function updateCity(req, res) {
    try {
        const id = req.params.id;
        const data = {
            name: req.body.name
        }
        const city = await CityService.updateCity(id, data)
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}


module.exports = { createCity, deleteCity, updateCity }
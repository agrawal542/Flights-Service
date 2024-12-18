const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/comman");

/**
 * POST: /flights
 * req-body { 
 *   flightNumber: 'AI101', 
 *   airplaneId: 123, 
 *   departureAirportCode: 'DEL', 
 *   arrivalAirportCode: 'BOM', 
 *   arrivalTime: '2024-12-10 15:30:00', 
 *   departureTime: '2024-12-10 12:00:00', 
 *   price: 5500.75, 
 *   totalSeats: 150 
 *  }
 */

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportCode: req.body.departureAirportCode,
            arrivalAirportCode: req.body.arrivalAirportCode,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = { createFlight }
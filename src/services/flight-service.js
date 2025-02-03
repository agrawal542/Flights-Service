const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error)
        console.log(error); // Always log the error for debugging

        if (error.name === 'SequelizeValidationError') {
            let explanation = error.errors.map((err) => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            let explanation = `Foreign key constraint error: ${error.fields} - The value ${error.value} does not exist in the referenced table '${error.table}'`;
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    try {
        let customWhereFilter = {};
        let customOrderFilter = [];

        // trips = MUM-DEL
        if (query.tripes) {
            [departureAirportCode, arrivalAirportCode] = query.tripes.split('-');
            customWhereFilter.departureAirportCode = departureAirportCode;
            customWhereFilter.arrivalAirportCode = arrivalAirportCode;
        }

        // prices = 1000-4000 or 6000
        if (query.prices) {
            [minPrice, maxPrice] = query.prices.split('-');
            customWhereFilter.price = { [Op.between]: [minPrice, (maxPrice === undefined ? 50000 : maxPrice)] }
        }

        // travellers = 10
        if (query.travellers) {
            customWhereFilter.totalSeats = { [Op.gte]: [query.travellers] }
        }

        // tripDate = 2024-12-10
        if (query.tripDate) {
            customWhereFilter.departureTime = { [Op.between]: [query.tripDate, query.tripDate + ' 23:29:00'] }
        }
        // sort = price_asc ,totalSheet_desc
        if (query.sort) {
            const params = query.sort.split(',');
            params.forEach(element => {
                const info = element.split('_');
                customOrderFilter.push(info)
            });
        }
        const fights = await flightRepository.getAllFlights(customWhereFilter, customOrderFilter);
        return fights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getFlight(id) {
    try {
        const response = await flightRepository.get(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode)
        } else if (error.name == 'Error') {
            throw new AppError(error.explanation, error.statusCode)
        }
        throw new AppError('Cannot fetch dataild of the flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateFlightSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        throw new AppError('Cannot update of the flight Seats', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateFlightSeats
}
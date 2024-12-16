const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log(error.name, error.message)
        if (error.name === 'SequelizeValidationError') {
            let explanation = error.errors.map((error) => {
                return error.message;
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        } else if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new AppError('TThe city id you requested is not present', StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode)
        } else if (error.name == 'Error') {
            throw new AppError(error.explanation, error.statusCode)
        }
        throw new AppError('Cannot fetch dataild of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete is not present', error.statusCode)
        }
        throw new AppError('Cannot delete of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update is not present', error.statusCode)
        }
        throw new AppError('Cannot update of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    deleteAirport,
    updateAirport
}
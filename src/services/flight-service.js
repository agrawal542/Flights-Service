const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

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




module.exports = {
    createFlight,
}
const { StatusCodes } = require('http-status-codes');
const { AirplaneReposity } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneReposity = new AirplaneReposity();

async function createAirplane(data) {
    try {
        const airplane = await airplaneReposity.create(data);
        return airplane;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = error.errors.map((error) => {
                return error.message;
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane
}
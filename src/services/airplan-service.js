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

async function getAirplanes() {
    try {
        const airplane = await airplaneReposity.getAll();
        return airplane;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneReposity.get(id);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statusCode)
        } else if (error.name == 'Error') {
            throw new AppError(error.explanation, error.statusCode)
        }
        throw new AppError('Cannot fetch dataild of the airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteAirplane(id) {
    try {
        const airplane = await airplaneReposity.destroy(id);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statusCode)
        }
        throw new AppError('Cannot delete of the airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneReposity.update(id, data);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to update is not present', error.statusCode)
        }
        throw new AppError('Cannot update of the airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}
const { StatusCodes } = require('http-status-codes');
const { CityReposity } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityReposity = new CityReposity();

async function createCity(data) {
    try {
        const city = await cityReposity.create(data);
        return city;
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = error.errors.map((error) => {
                return error.message;
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function deleteCity(id) {
    try {
        const city = await cityReposity.destroy(id);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete is not present', error.statusCode)
        }
        throw new AppError('Cannot delete of the airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityReposity.update(id, data);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update is not present', error.statusCode)
        }
        throw new AppError('Cannot update of the city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    createCity,
    deleteCity,
    updateCity
}
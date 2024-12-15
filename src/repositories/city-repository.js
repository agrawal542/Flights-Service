
const CrudRepository = require('./crud-repository')
const { City } = require('../models')

class CityReposity extends CrudRepository {
    constructor() {
        super(City)
    }
}
module.exports = CityReposity; 

const CrudRepository = require('./crud-repository')
const { Airport } = require('../models')

class AirportReposity extends CrudRepository {
    constructor() {
        super(Airport)
    }
}
module.exports = AirportReposity; 
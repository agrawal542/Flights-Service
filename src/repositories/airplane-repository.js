
const CrudRepository = require('./crud-repository')
const { Airplane } = require('../models')

class AirplaneReposity extends CrudRepository {
    constructor() {
        super(Airplane)
    }
}
module.exports = AirplaneReposity; 

const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport, sequelize } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }

    async getAllFlights(whereFilter, orderFilter) {
        const response = await Flight.findAll({
            where: whereFilter,
            order: orderFilter,
            include: [
                {
                    model: Airplane,
                    required: true , // ( make left join to inner join if you add this line ) (right: true ,make right join)
                    as: "airplane_details"
                },
                {
                    model: Airport,
                    required: true,
                    as: "airport_departure_details",
                    on:
                    {
                        col1: sequelize.where(sequelize.col("Flight.departureAirportCode"), "=", sequelize.col("airport_departure_details.code"))
                    }
                    // Or
                    // sequelize.literal(
                    //     `Flight.departureAirportCode = departure_info.code`
                    // )
                },
                {
                    model: Airport,
                    required: true,
                    as: "airport_arrival_details",
                    on:
                    {
                        col1: sequelize.where(sequelize.col("Flight.arrivalAirportCode"), "=", sequelize.col("airport_arrival_details.code"))
                    }
                }
            ]
        })
        return response;
    }
}
module.exports = FlightRepository; 
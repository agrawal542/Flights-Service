
const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport, City, sequelize } = require('../models');
const { addRawLockOnFlight } = require('./queries');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }

    async getAllFlights(whereFilter, orderFilter) {
        const response = await Flight.findAll({
            where: whereFilter,
            order: orderFilter,
            attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt from Flight
            include: [
                {
                    model: Airplane,
                    required: true, // ( make left join to inner join if you add this line ) (right: true ,make right join)
                    as: "airplane_details",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt from Flight
                },
                {
                    model: Airport,
                    required: true,
                    as: "airport_departure_details",
                    attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt from Flight
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
                    attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt from Flight
                    on:
                    {
                        col1: sequelize.where(sequelize.col("Flight.arrivalAirportCode"), "=", sequelize.col("airport_arrival_details.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                        as: "city_details",
                        attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt from Flight
                    }
                }
            ]
        })
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        await sequelize.query(addRawLockOnFlight(flightId)) ;
        if (dec) {
            const response = await Flight.decrement('totalSeats', { by: seats, where: { id: flightId } });
            return response;
        } else {
            const response = await Flight.increment('totalSeats', { by: seats, where: { id: flightId } });
            return response;
        }
    }
}
module.exports = FlightRepository; 
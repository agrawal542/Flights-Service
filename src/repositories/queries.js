function addRawLockOnFlight(flightId) {
    return `SELECT * FROM Flights WHERE id=${flightId} FOR UPDATE`
}



module.exports = {
    addRawLockOnFlight
}
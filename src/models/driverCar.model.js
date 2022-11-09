const connection = require('./db/connection');

const insert = async (driverCar) => {
    await connection.execute(
    'INSERT INTO drivers_cars (driver_id, car_id) VALUE (?, ?)',
    [driverCar.driverId, driverCar.carId], 
    );
};

module.exports = {
    insert,
};
const snakeize = require('snakeize');
const connection = require('./db/connection');
const camelize = require('camelize')

const insert = async (cars) => {
    const columns = Object.keys(snakeize(cars))
    .map((key) => `${key}`)
    .join(',');

const placeholders = Object.keys(cars)
    .map((_key) => '?')
    .join(', ');
        
const [{ insertId }] = await connection.execute(
    `INSERT INTO cars (${columns}) VALUE (${placeholders})`,
    [...Object.values(cars)],
    );
    return insertId;
};

const findById = async (car) => {
    const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id = ?',
        [car],
    );
    return camelize(passenger);
};

module.exports = {
    insert,
    findById,
};
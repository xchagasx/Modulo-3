const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM drivers'
  );
  return camelize(result)
}

const findById = async (driverId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM drivers WHERE id = ?',
    [driverId],
  );
  return camelize(result);
};

const insert = async (driver) => {
  const columns = Object.keys(snakeize(driver))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(driver)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO drivers (${columns}) VALUE (${placeholders})`,
    [...Object.values(driver)],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
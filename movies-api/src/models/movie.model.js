const connection = require('./connection');

const findAll = async (filter) => {
  if (filter) {
    const [products] = await connection.execute(
      'SELECT * FROM movies WHERE title LIKE ?', 
    [`%${filter}%`], 
    );
    return products;
  }
  const [products] = await connection.execute('SELECT * FROM movies');
  return products;
};

const findById = async ({ id }) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM movies WHERE id = ?', [id],
  );
  return product;
};

const create = async ({ title, directedBy, releaseYear }) => {
  const [product] = await connection.execute(
    'INSERT INTO movies (title, directed_by, release_year) VALUES (?, ?, ?)', 
    [title, directedBy, releaseYear],
  );
  return { id: product.insertId };
};

const update = async (id, { title, directedBy, releaseYear }) => {
  const [response] = await connection.execute(
    'UPDATE movies SET title = ?, directed_by = ?, release_year = ? WHERE id = ?',
    [title, directedBy, releaseYear, id],
  );
  return { id, title, directedBy, releaseYear, response };
};

const remove = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM movies WHERE id = ?', [id],
  );

  if (affectedRows > 0) return 'Registro removido com sucesso!';
};

module.exports = { findAll, findById, create, update, remove };
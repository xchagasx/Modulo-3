const { movieModel } = require('../models');
const {
  validateNewMovie, validateId,
} = require('./validations/validationsInputValues');

const getAll = async (findBy) => {
  const movies = await movieModel.findAll(findBy);
  return { type: null, message: movies };
};

const getById = async (movieIdParam) => { 
  const error = validateId(movieIdParam);
  if (error.type) return error;

  const movie = await movieModel.findById(movieIdParam);
  if (movie) return { type: null, message: movie };
  
  return { type: 'MOVIE_NOT_FOUND', message: 'Movie not found' };
};

const create = async ({ title, directedBy, releaseYear }) => {
  const error = validateNewMovie(title, directedBy, releaseYear);
  if (error.type) return error;
  
  const newMovieId = await movieModel.create({ title, directedBy, releaseYear });
  const newMovie = await movieModel.findById(newMovieId);

  return { type: null, message: newMovie };
};

const update = async (movieIdParam, { title, directedBy, releaseYear }) => {
  const error = validateNewMovie(title, directedBy, releaseYear);
  if (error.type) return error;

  const errorId = validateId(movieIdParam);
  if (errorId.type) return errorId;
  
  const updatedMovie = await movieModel.update(movieIdParam, { title, directedBy, releaseYear });

  return { type: null, message: updatedMovie };
};

const remove = async (movieIdParam) => {
  const error = validateId(movieIdParam);
  if (error.type) return error;
  const movieId = await movieModel.remove(movieIdParam);

  return { type: null, message: movieId };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};

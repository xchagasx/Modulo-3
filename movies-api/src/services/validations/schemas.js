const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addMovieSchema = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  directedBy: Joi.string().min(3).max(40).required(),
  releaseYear: Joi.number().required() });

module.exports = {
  idSchema,
  addMovieSchema,
};

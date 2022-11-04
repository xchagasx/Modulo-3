const movieService = require('../services/movie.service');
const errorMap = require('../utils/errorMap');

const create = async (req, res) => {
  const { title, directedBy, releaseYear } = req.body;

  const { type, message } = await movieService.create({ title, directedBy, releaseYear });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAll = async (req, res) => {

  const findBy = req.query ? req.query.filter : null;

  const { type, message } = await movieService.getAll(findBy);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const id = req.params.id;
  const { type, message } = await movieService.getById(Number(id));

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, directedBy, releaseYear } = req.body;

  const { type, message } = await movieService.update(id, { title, directedBy, releaseYear });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const remove = async (req, res) => {
  const id = req.params.id;

  const { type, message } = await movieService.remove(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};


module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};

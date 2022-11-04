const express = require('express');
const movieController = require('../controllers/movie.controller');
const validateNewMovieFields = require('../middlewares/validateNewMovieFields');

const router = express.Router();

router.get('/', movieController.getAll);

router.get('/:id', movieController.getById);

router.post('/', validateNewMovieFields, movieController.create);

router.put('/:id', validateNewMovieFields, movieController.update);

router.delete('/:id', movieController.remove);

module.exports = router;

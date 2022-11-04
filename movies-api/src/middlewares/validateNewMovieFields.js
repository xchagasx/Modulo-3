module.exports = (req, res, next) => {
  const { title, directedBy, releaseYear } = req.body;

  if (!title || !directedBy || !releaseYear) {
    return res.status(400).json({ message: 'fields not passed' });
  }

  return next();
};

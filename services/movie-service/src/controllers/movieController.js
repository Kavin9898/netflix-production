const Movie = require("../models/Movie");
const s3 = require("../s3/s3Client");

// Add Movie
exports.addMovie = async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;

    const movie = await Movie.create({
      title,
      description,
      videoUrl,
      thumbnail: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${req.body.thumbnail}`
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Movie
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
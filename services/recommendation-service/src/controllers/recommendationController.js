const WatchHistory = require("../models/WatchHistory");
const redis = require("../redisClient");
const axios = require("axios");

// Save watch history
exports.addWatchHistory = async (req, res) => {
  try {
    const { userId, movieId, category, liked } = req.body;

    await WatchHistory.create({ userId, movieId, category, liked });

    // Clear cache for user
    await redis.del(`recommend:${userId}`);

    res.status(201).json({ message: "Watch history saved" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check Redis cache
    const cached = await redis.get(`recommend:${userId}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Get user's watched categories
    const history = await WatchHistory.find({ userId });

    const categories = [...new Set(history.map(h => h.category))];

    // Fetch movies from movie-service
    const response = await axios.get(
      `${process.env.MOVIE_SERVICE_URL}/api/movies`
    );

    const movies = response.data;

    const recommended = movies.filter(movie =>
      categories.includes(movie.category)
    );

    // Store in Redis for 10 minutes
    await redis.set(
      `recommend:${userId}`,
      JSON.stringify(recommended),
      "EX",
      600
    );

    res.json(recommended);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
  userId: String,
  movieId: String,
  category: String,
  liked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("WatchHistory", watchHistorySchema);
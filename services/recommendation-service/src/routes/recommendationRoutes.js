const express = require("express");
const router = express.Router();
const {
  addWatchHistory,
  getRecommendations
} = require("../controllers/recommendationController");

router.post("/history", addWatchHistory);
router.get("/:userId", getRecommendations);

module.exports = router;
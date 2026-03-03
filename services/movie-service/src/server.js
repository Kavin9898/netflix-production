require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Movie DB Connected");
    app.listen(6000, () => console.log("Movie Service running on port 6000"));
})
.catch(err => console.log(err));
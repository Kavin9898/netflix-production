require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recommend", recommendationRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Recommendation DB Connected");
    app.listen(7000, () =>
        console.log("Recommendation Service running on port 7000")
    );
})
.catch(err => console.log(err));
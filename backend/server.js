const express = require("express");
const mongoose = require("mongoose");
const Chapter = require("./models/Chapter");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log(err);
});

app.get("/api/health", (req, res) => {
    res.json({
        message: "OpenJEE Backend Running 🚀"
    });
});

app.get("/api/chapters", async (req, res) => {

    try {

        const chapters = await Chapter.find();

        res.json(chapters);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
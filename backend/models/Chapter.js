const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({

    name: String,

    subject: String,

    classLevel: String,

    resources: [
        {
            title: String,
            teacher: String,
            link: String
        }
    ]

});

module.exports = mongoose.model("Chapter", chapterSchema);
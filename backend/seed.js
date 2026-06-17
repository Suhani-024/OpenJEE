const mongoose = require("mongoose");
const Chapter = require("./models/Chapter");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    await Chapter.deleteMany({});

   const data = require("../data/jee-resources.json");
    // const data = require("./data/jee-resources.json");
    const chapters = Object.values(data).map(chapter => ({
        name: chapter.name,
        subject: chapter.subject,
        classLevel: chapter.class,
        resources: chapter.resources
    }));

    await Chapter.insertMany(chapters);

    console.log(`${chapters.length} Chapters Inserted ✅`);

    process.exit();

})
.catch(err => {
    console.log(err);
});
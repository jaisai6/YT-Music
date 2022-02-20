if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const Vid = require("./models/Vid");
const mongoose = require("mongoose");
const fetchVid = require('./utils/updateDB');

const fetchVidAndUpdate = async () => {

    let ind = 0;

    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("Connected to the database");
    })
    .catch((err) => console.log(err));

    // const db = mongoose.connection;

    if(await Vid.countDocuments().exec() > 0){

        console.log(await Vid.countDocuments());
        // update ind
        let rand_vid = await Vid.findOne({});
        console.log(rand_vid);
        ind = rand_vid.idx;
        
    }
    
    //Clear the databases
    await Vid.deleteMany({}).exec();

    // Fetch the new set of videos
    ind = (ind+1)%5;
    let yt_vids = await fetchVid(ind);
    
    // Insert the fetched videos
    try {
        await Vid.insertMany(yt_vids);
        console.log("Videos are inserted in the database!");
    } catch (err) {
        console.log(err);
    }

    process.exit();
}   

fetchVidAndUpdate();
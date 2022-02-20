if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Importing packages
const express = require('express');
const app = express();

const Vid = require("./models/Vid");
const mongoose = require('mongoose');
const fetchVid = require('./utils/updateDB');


// Database Config
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log("Connected to the database");
})
.catch((err) => console.log(err));

const db = mongoose.connection;

db.once('open', async () => {
    if(await Vid.countDocuments().exec() > 0) return;

    console.log("No documents present in the db!");
    let yt_vids = await fetchVid(0);
    
    try {
        await Vid.insertMany(yt_vids);
        console.log("Videos are inserted in the database!... Let's go");
    } catch (err) {
        console.log(err);
    }
});

// app config
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// view engine
app.set('view engine', 'ejs');

// format: {'idx': 0, 'videoID': XbGs_qK2PQA, 'publishedAt': 1385571000000}

app.get('/', async (req,res) => {
    res.redirect('/1');
});

app.get('/refresh', async (req,res) => {
    await Vid.deleteMany({}).exec();

    let yt_vids = await fetchVid(2);
    
    try {
        await Vid.insertMany(yt_vids);
        console.log("Videos are inserted in the database!... Let's go");
    } catch (err) {
        console.log(err);
    }

    res.send('refreshing');
});

app.get('/:n', async (req,res) => {
    console.log(req.params.n);

    let page = req.params.n;
    
    let cur_vids = await Vid.find().sort({publishedAt : -1}).limit(5)
                            .skip((page-1)*5).exec();

    console.log(cur_vids);

    res.render('index', {data: cur_vids});
}); 


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server up and running!"));

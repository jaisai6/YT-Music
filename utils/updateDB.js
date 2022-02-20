if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const Vid = require("../models/Vid");
const axios = require('axios');

const fetchVid = async (ind) => {

    let vid_arr = [];
    let arr = ['chainsmokers songs', 'alec banjamin songs', 'charlie puth songs', 'taylor swift songs', 'eminem songs'];

    const api_key = process.env.API_KEY;
    const order = "relevance";
    let maxResults = 50;

    ind = ind%5;

    let search = arr[ind%5];

    let url = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&part=snippet&q=${search}&maxResults=${maxResults}&order=${order}&type=video`;

    let res = await axios.get(url);
    let data = res.data;

    // console.log(res);

    data['items'].forEach(d => {
        console.log(d["snippet"]["title"]);
        cur_vid = {
            'idx': ind,
            'videoId': d["id"]["videoId"],
            'publishedAt': Date.parse(d["snippet"]["publishedAt"])
        }
        vid_arr.push(cur_vid);
    });

    console.log(data['items'].length);

    console.log("vid_arr len: ", vid_arr.length);

    return vid_arr;
}   

module.exports = fetchVid;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vidSchema = new Schema({

    idx: {
        type: Number,
        required: true
    },

    videoId: {
        type: String,
        required: true
    },

    publishedAt: {
        type: Number,
        required: true
    }
});

const Vid = mongoose.model('vid', vidSchema);

module.exports = Vid;
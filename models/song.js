const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    "start-time": {
        type: Number,
        required: true
    },
    "end-time": {
        type: Number,
        required: true
    },
    "file-name": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "value": {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Song", songSchema);
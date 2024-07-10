const mongoose = require("mongoose")

const shortID = require("shortid")


const shortUrlSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortID.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})


const Urls = mongoose.model("Urls", shortUrlSchema)

module.exports = Urls
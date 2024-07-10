const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const parser = require("json-parser")
const Urls = require("./models/shortUrl")

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set("view engine", "ejs")

let port = 6800


mongoose.connect("mongodb+srv://salihmohamed363:BUxQpwe5mhb5kIdv@codealphacluster.iwemlyc.mongodb.net/?retryWrites=true&w=majority&appName=CodeAlphaCluster")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch(() => {
    console.log("Could not connect to MongoDB")
})

// app enpoints

app.get("/", async (req,res) => {
    const shortUrls = await Urls.find({})
    res.render("index", {ShortURLS: shortUrls})
})


app.post("/shortUrls", async (req,res) => {
    await Urls.create({fullURL : req.body.fullURL})
    res.redirect("/")
})


app.get("/:shortUrls", async (req,res) => {
    const shortUrl = await Urls.findOne({short: req.params.shortUrls})

    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.fullURL)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
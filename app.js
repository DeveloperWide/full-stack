const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const ejsMate = require('ejs-mate')
const Listing = require("./models/listings");
const path = require("path");

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs'); // so you can render('index')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().then(() => {
    console.log(`Connected To DB`)
}).catch((er) => {
    console.log(`Error :-`, er)
})

async function main() {
    Listing
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

//Redirect On Listings Page
app.get("/", (req, res) => {
    res.redirect("/listings")
})

//Retrive All Listings
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings })
});

//Render Form 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Create Route
app.post("/listings", async (req, res) => {
    const listing = new Listing(req.body);
    await listing.save();
    res.redirect("/listings");
});
//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})
app.listen(PORT, () => {
    console.log(`Server is listing on PORT ${PORT}`)
})
const mongoose = require("mongoose");
const Listing = require("../models/listings")
const data = require("./data");

main().then(() => {
    console.log(`Connected To DB`)
}).catch((er) => {
    console.log(`Error :-`, er)
})

async function main() {
    Listing
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


const initData = async () => {
    await Listing.deleteMany({});
    const initDB = data.data;
    await Listing.insertMany(initDB);
}

initData();
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
    let initDB = data.data;
    initDB = initDB.map((obj) => ({...obj , owner : '680a749db6368dae32c1ab62'}));
    await Listing.insertMany(initDB);
    console.log(`Data initialized`)
}

initData();
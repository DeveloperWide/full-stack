const express = require("express");
const ExpressError = require("./ExpressError");
const app = express();
const PORT = 8080;

const checkToken = (req ,res ,next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
        next()
    }
    throw new ExpressError(401 , "ACCESS DENIED")
}

app.get("/api" , checkToken ,(req ,res) => {
    res.send("data")
})

app.get("/home" , (req ,res) => {
    abcd = abcd;
})

app.get("/random" , (req , res) => {
    res.send(`You are at random path`)
});

app.use((req ,res ,next) => {
    res.status(404).send("Page Not Found");
});

app.use((err , req ,res ,next) => {
    let {status = 500, message = "Some Error OCCURRED"} = err;
    res.status(status).send(message);
    next(err);
})

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`)
})
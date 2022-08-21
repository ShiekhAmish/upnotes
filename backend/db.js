
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/upnotes"

const connectToMongo= () =>{

    mongoose.connect(mongoURI, ()=>{
        console.log("Connected Succefully");
    })
}

module.exports = connectToMongo;
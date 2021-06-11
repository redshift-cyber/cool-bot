const mclient = require('mongodb').mclient
const mongoose = require('mongoose');



const database = function(){

console.log('databse function accessed.')
    try{
    mongoose.connect('mongodb+srv://coolbot:falcon123@cluster0.6obww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});
    console.log("Sucessfully connected to the database!")
    }

    catch(error){
        console.log(error)
    }



}

module.exports = database
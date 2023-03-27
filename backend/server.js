const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();//this gets what is in our env folder
const UserModel = require("./models/Users")//we're requiring the usermodel's model

//This will basically allow us to connect to our react frontend without giving
//any error
const cors = require('cors')

//This will turn the request body to javascript object. if you don't do this,
//any request that involves post will give you an error
app.use(express.json())
app.use(cors())

//connect to mongo db
const dbURL = process.env.API_KEY;
 
async function dataBaseConnection(){
    try{
        await mongoose.connect(dbURL);
        console.log("connected to database")
    } catch (error) {
        console.error('your error is:' + error)
    }
}

dataBaseConnection();


//For example, let say we want to get user using the get request, 
//we'd do this: 

app.get("/getUsers", (req, res) => {
   //The below will find user in ther user collection
   //and if there is an error, it will let use know
   //if there isn't, it will spit out the user we asked for
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            //This will send back a json to the client
            res.json(result);
        }
    })
})

 
app.post("/createUser", async (req, res) => {
    //When making a post request, the server is expecting to receive a req from the client
    //the data tat will be passed from the client will be stored in the req parameter and then
    //we'd do req.body to get those data that was sent from the frontend. Thi will now be stored
    //into a variable that will in turn be stored in the UserModel so as to create new user with it.
    //the .save() method is used to save the information to the database after the new user have been
    //created
    const userBody = req.body;
    const newUser = new UserModel(userBody)
    await newUser.save()
    .then(() => console.log('created'))
    .catch((error) => console.log(error))
    
})


app.listen(3001, () => {
    console.log('server is running');
})



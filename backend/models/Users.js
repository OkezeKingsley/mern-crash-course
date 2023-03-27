const mongoose = require("mongoose");

//This will define the structure of the database
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

});

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;
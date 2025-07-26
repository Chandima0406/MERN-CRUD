const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,// Name is required
    },
    email: {
        type: String,
        required: true,// Email is required
        unique: true // Email must be unique
    },
    age: {
        type: Number,
        required: true,// Age is required
    },
    address:{
        type: String,
        required: true,// Address is required
    }
});

module.exports = mongoose.model(
    "Usermodel",//file name
    userSchema //schema name
)



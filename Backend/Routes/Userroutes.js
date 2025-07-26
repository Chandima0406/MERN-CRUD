const express = require("express");
const router = express.Router();
// Importing Model
const User = require('../Model/Usermodel');

// Importing Controller
const userController = require('../Controlers/Usercontrolers');

// Route to get all users
router.get("/", userController.getAllUsers);

 // Route to get all users
router.post("/", userController.addusers);

// Route to get user by ID
router.get("/:id", userController.getUserById);

// Route to update user by ID
router.put("/:id", userController.updateUserById);

// Route to delete user by ID
router.delete("/:id", userController.deleteUserById);


module.exports = router; // Exporting the router






const user = require('../Model/Usermodel');

// Function to get all users
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await user.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

//data insert 
const addusers = async (req, res, next) => {
    const { name, email, age, address } = req.body;

    try {
        const users = new user({
            name,
            email,
            age,
            address
        });
        await users.save();
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ message: "Unable to add user", error: error.message });
    }
};

// get by id
const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userData = await user.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: userData });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// update user by id
const updateUserById = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, age, address } = req.body;
    try {
        // Add { new: true } option to return updated document
        const userData = await user.findByIdAndUpdate(
            userId, 
            {
                name,
                email,
                age,
                address
            },
            { new: true } // This ensures we get the updated document
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "User updated successfully",
            user: userData 
        });
    } catch (error) {
        console.error("Error updating user by ID:", error);
        return res.status(500).json({ 
            message: "Error updating user", 
            error: error.message 
        });
    }
};

// delete user by id
const deleteUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userData = await user.findByIdAndDelete(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        return res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};


exports.getAllUsers = getAllUsers;
exports.addusers = addusers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
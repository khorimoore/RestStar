import { Router } from 'express';
import { User } from '../models/user.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import the JSON Web Token library
import bcrypt from 'bcrypt'; // Import the bcrypt library for password hashing
// Login function to authenticate a user
export const login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    // Find the user in the database by username
    const user = await User.findOne({
        where: { username },
    });
    // If user is not found, send an authentication failed response
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'password Authentication failed' });
    }
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
    return res.json({ token }); // Send the token as a JSON response
};
// Create a new router instance
const router = Router();
// POST /login - Login a user
router.post('/login', login); // Define the login route
export default router; // Export the router instance
//----------------------------------------------------------------
// Sign-up function to register a new user
export const signup = async (req, res) => {
    const { username, password } = req.body; // Extract user details from request body
    // Check if the user already exists
    const existingUser = await User.findOne({
        where: { username },
    });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    try {
        // Hash the password before saving to the database
        // Create a new user in the database
        const newUser = await User.create({ username, password });
        // Send the token as a JSON response
        return res.status(201).json({ newUser });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// POST /signup - Sign up a new user
router.post('/signup', signup); // Define the signup route
router.get('/', login);

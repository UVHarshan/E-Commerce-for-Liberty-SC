const router = require("express").Router();
let Customer = require("../models/customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Log in the user
router.post("/", async (req, res) => {
        try {
            const {userName, password} = req.body;

            // Getting the customer account for the entered userName
            const existingCustomer = await Customer.findOne({userName});

            // Getting the employee account for the entered username
            const existingUser = await User.findOne({userName});

            // If there isn't an account for the entered email
            if (existingCustomer) {
                const passwordCorrect = await bcrypt.compare(password, existingCustomer.passwordHash);
                if (passwordCorrect) {
                    return res.json({userType: "customer", userId: existingCustomer._id});
                } else if (existingUser) {
                    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
                    if (passwordCorrect) {
                        return res.json({userType: existingUser.userType, userId: existingUser._id});
                    } else {
                        return res.json({userType: "undefined", userId: ""});
                    }
                } else {
                    return res.json({userType: "undefined", userId: ""});
                }
            } else if (existingUser) {
                const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
                if (passwordCorrect) {
                    return res.json({userType: existingUser.userType, userId: existingUser._id});
                } else {
                    return res.json({userType: "undefined", userId: ""});
                }
            } else {
                return res.json({userType: "undefined", userId: ""});
            }
        } catch
            (err) {
            return res.status(500).json({errorMessage: err});
        }
    }
);

module.exports = router;

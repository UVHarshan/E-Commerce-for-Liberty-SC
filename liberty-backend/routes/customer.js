const router = require("express").Router();
let Customer = require("../models/customer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Return all customers.

router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/:id").get((req, res) => {
  Customer.findById(req.params.id)
      .then((customer) => {
        let customerCopy = {
          _id: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          userName: customer.userName,
          email: customer.email,
          mobile: customer.mobile,
          permanentAddress: customer.permanentAddress,
          deliveryAddress: customer.deliveryAddress,
          province: customer.province,
          district: customer.district,
          postalCode: customer.postalCode
        }
        res.json(customerCopy)
      })
      .catch((err) => res.status(400).json("Error: " + err));
});

// Post request to Register customers
router.route("/add").post( async (req, res) => {
try {

  const {
    firstName,
    lastName,
    userName,
    email,
    mobile,
    deliveryAddress,
    password
  } = req.body;


  const existingCustomer = await Customer.findOne({email});
  if (existingCustomer)
    return res.status(400).json({
      errorMessage: "An account with this email already exists!!!",
    });

  // Hashing the password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Creating a new customer object
  const newCustomer = new Customer({
    firstName,
    lastName,
    userName,
    email,
    mobile,
    deliveryAddress,
    passwordHash,
  });

  await newCustomer.save();
  res.send("Done!!")

} catch (err) {
  return res.status(500).json({errorMessage: err.toString()});
}
});

// Log in the user
router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;

    // Getting the user account for the entered email
    const existingCustomer = await Customer.findOne({email});
    console.log(existingCustomer);

    // If there isn't an account for the entered email
    if (!existingCustomer) {
      return res.status(401).json({errorMessage: "Wrong Email or password!!"});
    } else {
      // Checking the password
      const passwordCorrect = await bcrypt.compare(
          password,
          existingCustomer.passwordHash
      );

      if (!passwordCorrect)
        return res.status(401).json({errorMessage: "Wrong Email or password!!"});
    }


    // If the entered password is correct...........
    // Generating a token using the document ID of mongoDB and the given secret key
    const token = jwt.sign(
        {
          user: existingCustomer._id,
        },
        process.env.JWT_SECRET
    );

    // Send the token in a HTTP only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    return res.status(500).json({errorMessage: err});
  }
});

///////// Logout the user by clearing the cookie and setting the expired date to a very old date
router.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }) .send();

});


/// Checking whether the user is logged in or not
router.get("/loggedIn", (req,res) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) return res.json(false);

    // Decoding the JWT token and verifying it
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);

  } catch (err) {
    res.json(false);
  }
});

module.exports = router;

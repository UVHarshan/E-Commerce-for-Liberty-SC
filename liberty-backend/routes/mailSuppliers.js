const nodemailer = require("nodemailer");
const router = require('express').Router();
require('dotenv').config();

const Email = "libertysuper575@gmail.com";
const EmailPassword = "Liberty_12345";

//* Email *//
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Email,
    pass: EmailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Router to send an email
router.post("/send-mail/:email/:name", function (req, res) {
  let receiverEmail = req.params.email;
  let receiverName = req.params.name;
  let requestItems = req.body;

  let mailOptions = {
    from: Email,
    to: receiverEmail,
    subject: "Product List to Buy",
    html: `
    <div>
    <p>Dear ${receiverName},</p></br> 
    <p>We would like to order  these items from you. Please acknowledge us regarding this.</p>
    <br>
    <table style="border: 1px solid black;border-collapse: collapse">
        <thead>
        <tr style="border: 1px solid black">
          <td>Product</td>
          <td>Quantity</td>
        </tr>
        </thead>
        <tbody>
        ${requestItems.map(item => `<tr><td>${item.product}</td><td>${item.quantity}</td></tr>`)}
        </tbody>
      </table>
    </br>
    <p>Thanks and Regards!<br/>
    -Liberty Super Center-</p>
</div>
`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send({msg: "Mail Sent error:" + error.message});
    } else {
      res.status(200).json({msg: "Please check you email"});
    }
  });
});

module.exports = router;

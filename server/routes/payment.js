var express = require("express");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const sendEmail = require("../services/email.service");

/* GET users listing. */
router.post("/create-charge", async (req, res, next) => {
  try {
    const {
      amount = 200,
      source = "tok_1JgSGSIrhF0UywCZXakhRZbU",
      receipt_email = "s@g.com",
    } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source,
      receipt_email,
    });

    if (!charge) throw new Error("charge unsuccessful");

    const email = await sendEmail(receipt_email, amount);

    res.status(200).json({
      charge,
      message: "charge posted successfully",
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;

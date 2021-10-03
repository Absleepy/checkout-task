var express = require("express");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var paymentRouter = require("./routes/payment");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/payment", paymentRouter);

app.use("*", (req, res) => res.send("Nothin here.. jon snow ;)"));

const port = process.env.port || 3060;

app.listen(port, () => console.log(`server running on port ${port}`));

module.exports = app;

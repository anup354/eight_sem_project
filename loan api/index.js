const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);


const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Server is running on port:${port}`);
});
// static images folder
app.use(express.static(path.resolve("./public/images")));

//customer routes
const userRoute = require("./routes/userRegistration/authRoute");
const predictRoute = require("./routes/prediction/predictionRoute");


app.use([
  userRoute,predictRoute
]);


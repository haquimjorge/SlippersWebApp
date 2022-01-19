require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/routes.js");
require("./config/database.js");
const passport = require('passport')
const app = express();
const path = require('path')
const fileUpload = require('express-fileupload')

// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

app.use(cors());
app.use(express.json());
app.use(fileUpload())
app.use(passport.initialize())

app.use("/api", router);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname + "/client/build/index.html"));
//     });
//   }




const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'
app.listen(PORT,HOST, () => {
  console.log(`listening in port ${PORT} on host ${HOST}`);
});
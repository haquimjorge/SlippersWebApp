require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/routes.js");
require("./config/database.js");
const passport = require('passport')
const app = express();
const path = require('path')
const engines = require("consolidate");
const paypal = require("paypal-rest-sdk");


// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

app.use(cors());
app.use(express.json());
app.use(passport.initialize())

app.use("/api", router);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname + "/client/build/index.html"));
//     });
//   }




app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
      "ASmh7ARZ-3oamcpSZaPIkhVS30Sn44DzOSQDUiVPrSoT4piOoAYbRM_pJKPRl4fc0fLjcpP6eV1UGXPd",
  client_secret:
      "EIFjNB7C3ndEN0R6adMzl7_adFtDXOZ_jPH9IbFgcb06e7yE-GQ3EynsWYjGvID0tJN4G9bT36KrGSkBE"
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/paypal", (req, res) => {
  var create_payment_json = {
      intent: "sale",
      payer: {
          payment_method: "paypal"
      },
      redirect_urls: {
          return_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel"
      },
      transactions: [
          {
              item_list: {
                  items: [
                      {
                          name: "item",
                          sku: "item",
                          price: "1.00",
                          currency: "USD",
                          quantity: 1
                      }
                  ]
              },
              amount: {
                  currency: "USD",
                  total: "1.00"
              },
              description: "This is the payment description."
          }
      ]
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
          res.redirect(payment.links[1].href);
      }
  });
});

app.get("/success", (req, res) => {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
      payer_id: PayerID,
      transactions: [
          {
              amount: {
                  currency: "USD",
                  total: "1.00"
              }
          }
      ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
      error,
      payment
  ) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          res.render("success");
      }
  });
});

app.get("cancel", (req, res) => {
  res.render("cancel");
});


const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'
app.listen(PORT,HOST, () => {
  console.log(`listening in port ${PORT} on host ${HOST}`);
});
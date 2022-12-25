const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const SteamUser = require("steam-user");
const SteamTotp = require("steam-totp");
const TradeOfferManager = require("steam-tradeoffer-manager");

const SteamCommunity = require("steamcommunity");

// const config = require("./config.json");
const app = express();

app.use(cors());
// app.use(json());

const port = 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// const {json} = require("express");

const logOnOptions = {
  accountName: `${process.env.USERNAME2}`,
  password: `${process.env.PASSWORD2}`,
  twoFactorCode: SteamTotp.generateAuthCode(`${process.env.SHAREDSECRET}=`),
};

console.log("log", logOnOptions);
app.get("/", (req, res) => {
  res.send("<h2>hello world</h2>");
});

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
  steam: client,
  community: community,
  language: "en",
});

app.get("/hello", (req, res) => {
  res.send("<h2>hi hello route</h2>");
});

app.listen(port, () => console.log("running..."));

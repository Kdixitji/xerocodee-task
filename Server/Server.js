const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const LoginAPI = require("./Routes/LoginAPI");
const AuthAPI = require("./Routes/AuthAPI.js");
const ServiceAPI = require("./Routes/ServiceAPI");
const UserAPI = require("./Routes/UserAPI");
const passportConfig = require("./Config/Passport");
const passport = require("passport");

const app = express();
const PORT = 4000;

const customMiddleware = (req, res, next) => {
  console.log("middleware executed");
  next();
};
app.use(customMiddleware);

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(passport.initialize());

passportConfig(passport);

//mongodb
mongoose
  .connect(
    "mongodb+srv://kdixitji:kdixitji123456@cluster0.bd46nkh.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
  });
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

//API's
app.use("/auth", AuthAPI);
app.use("/login", LoginAPI);
app.use("/service", ServiceAPI);
app.use("/user", UserAPI);

//github
const clientId = "7517ba101e161c1eba76"; // Replace with your GitHub Client ID
const clientSecret = "e9ae2ffea354ef814f32c82f116940e23fafbd9a"; // Replace with your GitHub Client Secret

//google

app.get("/auth/google/callback", (req, res) => {
  // Handle Google OAuth callback and obtain profile information
  const userProfile = req.user.profile;
  res.json(userProfile);
});

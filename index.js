const express = require("express");
const cors = require("cors");
const mailer = require("./nodemailr");
const axios = require("axios");
const app = express();
require("dotenv").config();
const path = require("path");
const { log } = require("console");

const APIKEY = process.env.API_KEY;

function generatePassword() {
  let length = 12,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  "/",
  express.static(path.resolve(__dirname, "client"), { extensions: ["js"] })
);
const indexPath = path.join(__dirname, "client", "index.html");

app.post("/", async (req, res) => {
  const { email } = req.body;
  const password = generatePassword();
  console.log(email, password);
  const message = {
    to: email,
    subject: "Ваши регистрационые данные",
    html: ` 
    <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>   
    
    <i>Данные Вашей учетной записи:</i>   
    <ul>
    <li>login: ${email}</li>  
    <li>password: ${password}</li>
    </ul> 
    Рекомендуем изменить пароль после авторизации`,
  };

  mailer(message);

  try {
    const { data } = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKEY,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    await axios.put(
      `https://freelancer-99d6f-default-rtdb.europe-west1.firebasedatabase.app/users/${data.localId}.json`,
      {
        id: data.localId,
        email,
        created: Date.now(),
        isActive: false,
      }
    );
  } catch (error) {
    res.json(error);
  }
});

console.log("sort");

app.get("*", function (req, res) {
  res.sendFile(indexPath);
});

app.listen(80, () => console.log("server start"));

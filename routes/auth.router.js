const express = require("express");
const generatePassword = require("../utils/generatePassword");
const router = express.Router({ mergeParams: true });
const mailer = require("../nodemailr");
const axios = require("axios");
require("dotenv").config();

const APIKEY = process.env.API_KEY;

router.post("/signUp", async (req, res) => {
  const { email } = req.body;
  const password = generatePassword();

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
    mailer(message);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
